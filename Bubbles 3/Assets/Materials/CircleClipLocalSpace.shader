Shader "Sprite/CircleClipLocalSpace"
{
    Properties
    {
		_Color ("Color Tint", Color) = (1,1,1,1)

 	}
    SubShader
    {
 
        Tags { "Queue"="Transparent" "IgnoreProjector"="True" "RenderType"="Transparent" }
   
        Pass
        {
            Blend SrcAlpha OneMinusSrcAlpha
            Cull Off
            Lighting Off
            ZWrite Off
           
            //Fog { Color (0,0,0,0) }
 
            CGPROGRAM
            #pragma exclude_renderers d3d11 xbox360
            #pragma vertex vert
            #pragma fragment frag
            #pragma target 3.0
            #pragma glsl
            #include "UnityCG.cginc"
 
        	sampler2D _MainTex;
            float4 _MainTex_ST;
            float _Edge;
            float _Strength;
            fixed4 _Color;
                     
            struct v2f
            {
                half4 vertex : POSITION;
                half2 texcoord : TEXCOORD0;
                half2 savedVertices : TEXCOORD1;
                half2 texUV : TEXCOORD2;  
                fixed4 color : COLOR;

            };
 
            struct appdata_t
            {
                float4 vertex : POSITION;
                float2 texcoord : TEXCOORD0;
                float2 savedVertices : TEXCOORD1;
                float4 color : COLOR;
            };
           
            inline float4 Overlay (float4 a, float4 b) {
 
                return lerp(   1 - 2 * (1 - a) * (1 - b),    2 * a * b,    step( a, 0.5 ));
           
            }
           
            v2f vert (appdata_t v)
            {
                v2f o;
                o.vertex = mul(UNITY_MATRIX_MVP, v.vertex);
                o.texcoord = v.texcoord - half2(0.5,0.5);
//                v.color = new Color(0.3f, 0.3f, 0.3f, 0.3f);
                o.color = (.2,.5,.7,1);
                o.texUV = v.savedVertices * _MainTex_ST.xy + _MainTex_ST.w;
               
                return o;
            }
           
            half4 frag (v2f IN) : COLOR
            {
                fixed4 col = fixed4 (_Color);  //Overlay((.2,.5,.7,1), tex2D(_MainTex, IN.texUV) * _Strength);
                fixed4 transparent = fixed4(col.xyz,0);
                float l = length(IN.texcoord);
                float thresholdWidth = length(float2(ddx(l),ddy(l))) * _Edge;
 
                float antialiasedCircle = saturate(((1.0 - ( thresholdWidth * 0.25) - (l * 2)) / thresholdWidth) + 0.5) ;
                return lerp(transparent, col, antialiasedCircle);
            }
            ENDCG
        }
    }
}