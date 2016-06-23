Shader "Lumosity/GrassNew" {
    Properties {
        _Color ("Color", Color) = (1,1,1,1)
        _MainTex ("Albedo (RGB) Trans (A)", 2D) = "white" {}
        _Glossiness ("Smoothness", Range(0,1)) = 0.5
        _Metallic ("Metallic", Range(0,1)) = 0.0
        _Cutoff ("Shadow alpha cutoff", Range(0,1)) = 0.5
        _Speed ("Speed", Range (-100,100)) = 1
        _Amplifier ("Amplifier", Range(-10,10)) = 0.5
        _RedMap ( "Red Map", 2D ) = "black" {}
        _RedStrength ( "Red Strength", Range ( -20, 20 )) = 1
        _GreenMap ( "Green Map", 2D ) = "black" {}
        _GreenStrength ( "Green Strength", Range ( -20, 20 )) = 1
        _BlueMap ( "Blue Map", 2D ) = "black" {}
        _BlueStrength ( "Blue Strength", Range ( -20, 20 )) = 1
    }
    SubShader {

        // Tags for setup
        // IgnoreProjector: projectors will ignore this material.
        // RenderType: determines how this will be rendered.
        // More info at: http://docs.unity3d.com/462/Documentation/Manual/SL-SubshaderTags.html
        Tags {"IgnoreProjector"="True" "RenderType"="TransparentCutout"}

        // We want to see grass from every directions, so culling is disabled.
        Cull Off

        // Level of detail, default
        LOD 200


        // Start of the cg program.
        CGPROGRAM


        // Physically based Standard lighting model, and enable shadows on all light types
        // "vertex:vert" specifies what vertex function to use.
        // "alphatest:_Cutoff" Enables alpha cutout transparency. Cutoff value is in a float variable _Cutoff.
        // "addshadow" Directive generates proper shadow caster pass.
        // More info at: http://docs.unity3d.com/Manual/SL-SurfaceShaders.html
        #pragma surface surf Standard fullforwardshadows vertex:vert alphatest:_Cutoff addshadow


        // The input structure Input generally has any texture coordinates needed by the shader. 
        // Texture coordinates must be named “uv” followed by texture name 
        // (or start it with “uv2” to use second texture coordinate set).
        // More info at: http://docs.unity3d.com/Manual/SL-SurfaceShaders.html
        struct Input 
        {
            float4 pos;
            float2 uv_MainTex;
        };

        half _Glossiness;
        half _Metallic;

        float _Amplifier;
        float _Speed;
        sampler2D _MainTex;
        sampler2D _RedMap;
        float _RedStrength;
        sampler2D _GreenMap;
        float _GreenStrength;
        sampler2D _BlueMap;
        float _BlueStrength;


        // Vert function
        // appdata_full: Standard data object, contains position, tangent, normal, four texture coordinates and color.
        // More info at: http://wiki.unity3d.com/index.php?title=Shader_Code
        void vert ( inout appdata_full v ) 
        {
            float2 uv = v.texcoord.xy;
            uv.x = 1 - uv.x;
            uv.y = 1 - uv.y;

            float4 redValue = tex2D (_RedMap, uv);
            float4 greenValue = tex2D (_GreenMap, uv);
            float4 blueValue = tex2D (_BlueMap, uv);    

            float twoPi = 2 * 3.141592653;

            float redSin = sin( (_Time.x + redValue.y * twoPi) * _Speed) * _Amplifier;
            v.vertex.z += redSin * redValue.x * _RedStrength;

            float greenSin = sin( (_Time.x + greenValue.x * twoPi) * _Speed) * _Amplifier;
            v.vertex.y += greenSin * greenValue.y * _GreenStrength;

            float blueSin = sin( (_Time.x + blueValue.x * twoPi) * _Speed) * _Amplifier;
            v.vertex.x += blueSin * blueValue.z * _BlueStrength;
        }


        // Surface function
        // Nothing crazy, just setting up SurfaceOutputStandard output using our values.
        void surf (Input IN, inout SurfaceOutputStandard o) 
        {
            fixed4 pixelColor = tex2D (_MainTex, IN.uv_MainTex);
            o.Albedo = pixelColor.rgb;

            // Metallic and smoothness come from slider variables
            o.Metallic = _Metallic;
            o.Smoothness = _Glossiness;

            // Alpha
            o.Alpha = pixelColor.a;
        }


        // End of cg program.
        ENDCG
    } 

    // Fallback shader.
    FallBack "Diffuse"
}