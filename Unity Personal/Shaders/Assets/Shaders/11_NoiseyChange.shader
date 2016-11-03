// Upgrade NOTE: replaced '_Object2World' with 'unity_ObjectToWorld'
// Upgrade NOTE: replaced '_World2Object' with 'unity_WorldToObject'

Shader "Steve/tut/12 - Noisey Change"{
	Properties {
		_Color ("Color Tint", Color) = (1.0,1.0,1.0,1.0)
		_MainTex ("High Texture", 2D) = "white" {}
		_MidTex ("Mid Texture", 2D) = "white" {}
		_LowTex ("Low Texture", 2D) = "white" {}
		_BumpMap ("Normal Texture", 2D) = "bump" {}
		_BumpMap2 ("Alt Normal Texture", 2D) = "bump" {}
		

		_EmitMap ("Emission Texture", 2D) = "black" {}
		_MidThreshold ("Mid Height Threshold", Range(0.0,4.0)) = 2
		_HighThreshold ("High Height Threshold", Range(0.0,4.0)) = 3
		_NoiseAmp  ("Noise Amp", Range(0.0,1000.0)) = 50
		_MorphSpeed ("Morph Speed", Range(0.0,1000.0)) = 50


		[Toggle] _isBending("is Bending", Float) = 1
		_BumpDepth ("Bump Depth", Range(0.0,10.0)) = 1
		_SpecColor ("Specular Color", Color) = (1.0,1.0,1.0,1.0)
		_Shininess ("Shininess", Float) = 10
		_RimColor ("Rim Color", Color) = (1.0,1.0,1.0,1.0)
		_RimPower ("Rim Power", Range(0.1,10.0)) = 3.0
		_EmitStrength ("Emission Strength", Range(0.0,2.0)) = 0
		_CentrePoint ("Centre", Vector) = (0, 0, 0, 0)
		_BlurFactor ("Blur Factor", Float ) = .01
	}
	SubShader {
		Pass {
			Tags {"LightMode" = "ForwardBase"}
			CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			
			//user defined variables
			uniform sampler2D _MainTex;
			uniform half4 _MainTex_ST;
			uniform sampler2D _MidTex;
			uniform half4 _MidTex_ST;
			uniform sampler2D _LowTex;
			uniform half4 _LowTex_ST;
			uniform sampler2D _BumpMap;
			uniform half4 _BumpMap_ST;
			uniform sampler2D _BumpMap2;
			uniform half4 _BumpMap2_ST;
			uniform sampler2D _EmitMap;
			uniform half4 _EmitMap_ST;
			uniform fixed4 _Color;
			uniform fixed4 _SpecColor;
			uniform fixed4 _RimColor;
			uniform half _Shininess;
			uniform half _RimPower;
			uniform fixed _BumpDepth;
			uniform fixed _MidThreshold;
			uniform fixed _HighThreshold;
			uniform fixed _EmitStrength;
			uniform float4 _CentrePoint;
			uniform float _BlurFactor;
			uniform float _MorphSpeed;
			uniform float _isBending;
			uniform float _NoiseAmp;
			
			//unity defined variables
			uniform half4 _LightColor0;
			
			//base input structs
			struct vertexInput{
				half4 vertex : POSITION;
				half3 normal : NORMAL;
				half4 texcoord : TEXCOORD0;
				half4 tangent : TANGENT;
			};
			struct vertexOutput{
				half4 pos : SV_POSITION;
				half4 tex : TEXCOORD0;
				fixed4 lightDirection : TEXCOORD1;
				fixed3 viewDirection : TEXCOORD2;
				fixed3 normalWorld : TEXCOORD3;
				fixed3 tangentWorld : TEXCOORD4;
				fixed3 binormalWorld : TEXCOORD5;
				half4 worldPos : TEXCOORD6;
				float objectDist : TEXCOORD7;
			};
			
			//vertex Function
			
			vertexOutput vert(vertexInput v){
				vertexOutput o;
				
				
				o.normalWorld = normalize( mul( half4( v.normal, 0.0 ), unity_WorldToObject ).xyz );
				o.tangentWorld = normalize( mul( unity_ObjectToWorld, v.tangent ).xyz );
				o.binormalWorld = normalize( cross(o.normalWorld, o.tangentWorld) * v.tangent.w );
				
				half4 posWorld = mul(unity_ObjectToWorld, v.vertex);
				o.worldPos = posWorld;
				
				o.objectDist = length ( v.vertex );
				
				o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
				o.tex = v.texcoord;
				
				o.viewDirection = normalize( _WorldSpaceCameraPos.xyz - posWorld.xyz );
				
				half3 fragmentToLightSource = _WorldSpaceLightPos0.xyz - posWorld.xyz;
				
				o.lightDirection = fixed4(
					normalize( lerp(_WorldSpaceLightPos0.xyz , fragmentToLightSource, _WorldSpaceLightPos0.w) ),
					lerp(1.0 , 1.0/length(fragmentToLightSource), _WorldSpaceLightPos0.w)
				);
				
				return o;
			}

			float hash( float n )
			{
			    return frac(sin(n)*43758.5453);
			}

			float noise( float3 x )
			{
			    // The noise function returns a value in the range -1.0f -> 1.0f

			    float3 p = floor(x);
			    float3 f = frac(x);

			    f       = f*f*(3.0-2.0*f);
			    float n = p.x + p.y*57.0 + 113.0*p.z;

			    return lerp(lerp(lerp( hash(n+0.0), hash(n+1.0),f.x),
			                   lerp( hash(n+57.0), hash(n+58.0),f.x),f.y),
			               lerp(lerp( hash(n+113.0), hash(n+114.0),f.x),
			                   lerp( hash(n+170.0), hash(n+171.0),f.x),f.y),f.z);
			}

			fixed4 frag(vertexOutput i) : COLOR
			{
				
				//Texture Maps
				fixed4 tex;
				fixed4 texN;
				float3 testVec;
				testVec = i.normalWorld;
				testVec = i.binormalWorld;
//				testVec = i.lightDirection;
//				testVec = i.viewDirection;
//				testVec = i.tangentWorld;
//				testVec = i.worldPos;
//
//				fixed4 lightDirection : TEXCOORD1;
//				fixed3 viewDirection : TEXCOORD2;
//				fixed3 normalWorld : TEXCOORD3;
//				fixed3 tangentWorld : TEXCOORD4;
//				fixed3 binormalWorld : TEXCOORD5;
//				half4 worldPos : TEXCOORD6;
//				float objectDist : TEXCOORD7;

				if (_isBending)
				{
					if (i.objectDist > _HighThreshold + (_SinTime.w / _MorphSpeed) + noise(testVec * _NoiseAmp))//  * lerp (-2, 2, noise(i.worldPos)))

					{
						tex = tex2D(_MainTex, i.tex.xy * _MainTex_ST.xy + _MainTex_ST.zw);
						texN = tex2D(_BumpMap, i.tex.xy * _BumpMap_ST.xy + _BumpMap_ST.zw);

					} 
					else if (false)//i.objectDist > _MidThreshold + (_SinTime.w / _MorphSpeed) + noise(testVec * _NoiseAmp))//* lerp (-2, 2, noise(i.worldPos)))

					{
						tex = tex2D(_MidTex, i.tex.xy * _MidTex_ST.xy + _MidTex_ST.zw);
						texN = tex2D(_BumpMap2, i.tex.xy * _BumpMap2_ST.xy + _BumpMap2_ST.zw);

					} 
					else
					{				
						tex = tex2D(_LowTex, i.tex.xy * _LowTex_ST.xy + _LowTex_ST.zw);
						texN = tex2D(_BumpMap, i.tex.xy * _BumpMap_ST.xy + _BumpMap_ST.zw);

					}
					
				}
				else
				{
					if (i.objectDist > _MidThreshold + _SinTime.w)// rand(i.objectDist) * _MorphSpeed )
					{
						tex = tex2D(_MainTex, i.tex.xy * _MainTex_ST.xy + _MainTex_ST.zw);
						texN = tex2D(_BumpMap, i.tex.xy * _BumpMap_ST.xy + _BumpMap_ST.zw);

					} 
					else if (i.objectDist > _HighThreshold + _SinTime.w )/// rand(i.objectDist) * _MorphSpeed)
					{
						tex = tex2D(_MidTex, i.tex.xy * _MidTex_ST.xy + _MidTex_ST.zw);
						texN = tex2D(_BumpMap2, i.tex.xy * _BumpMap2_ST.xy + _BumpMap2_ST.zw);

					} 
					else
					{				
						tex = tex2D(_LowTex, i.tex.xy * _LowTex_ST.xy + _LowTex_ST.zw);
						texN = tex2D(_BumpMap, i.tex.xy * _BumpMap_ST.xy + _BumpMap_ST.zw);

					}
				
				}

				fixed4 texE = tex2D(_EmitMap, i.tex.xy * _EmitMap_ST.xy + _EmitMap_ST.zw);
				
				//unpackNormal function
				fixed3 localCoords = fixed3(2.0 * texN.ag - float2(1.0, 1.0), _BumpDepth);
				
				//normal transpose matrix
				fixed3x3 local2WorldTranspose = fixed3x3(
					i.tangentWorld,
					i.binormalWorld,
					i.normalWorld
				);
				
				//calculate normal direction
				fixed3 normalDirection = normalize( mul( localCoords, local2WorldTranspose ) );
				
				//Lighting
				//dot product
				fixed nDotL = saturate(dot(normalDirection, i.lightDirection.xyz));
				
				fixed3 diffuseReflection = i.lightDirection.w * _LightColor0.xyz * nDotL;
				fixed3 specularReflection = diffuseReflection * _SpecColor.xyz * pow(saturate(dot(reflect(-i.lightDirection.xyz, normalDirection), i.viewDirection)) , _Shininess);
				
				//Rim Lighting
				fixed rim = 1 - nDotL;
				fixed3 rimLighting = nDotL * _RimColor.xyz * _LightColor0.xyz * pow( rim, _RimPower );
				
				fixed3 lightFinal = UNITY_LIGHTMODEL_AMBIENT.xyz + diffuseReflection + (specularReflection * tex.a) + rimLighting + (texE.xyz * _EmitStrength);
				
				
				return fixed4(tex.xyz * lightFinal * _Color.xyz, 1.0);
			}
			
			
			
			ENDCG
			
		}

	}
	//Fallback "Specular"
}