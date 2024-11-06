precision lowp float;

uniform float uAlpha;

void main()
{
    gl_FragColor = vec4(0.0, 1.0, 64.0/255.0, uAlpha);
}