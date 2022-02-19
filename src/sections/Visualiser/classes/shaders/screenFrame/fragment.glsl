varying vec2 vUv;

#define PI 3.14159265359

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

float plot (vec2 st, float pct){
    return smoothstep(0.01, 0.0, abs(st.x - pct));
}

void main()
{
    vec2 st = vUv;

    //Bottom left
    float b = smoothstep(0., 0.1, st.y);
    float l = smoothstep(0., 0.1, st.x);
    float pct = b * l;

    //Top right
    float t = smoothstep(1., .9, st.y);
    float r = smoothstep(1., .9, st.x);
    pct *= t*r;

    vec3 color = vec3(pct);

    gl_FragColor = vec4(color, 1.0);
}