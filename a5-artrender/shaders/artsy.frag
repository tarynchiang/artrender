#version 330

// CSci-4611 Assignment 5:  Art Render

// TODO: You need to calculate per-fragment shading here using a toon shading model

in vec3 position_in_eye_space;
in vec3 normal_in_eye_space;

out vec4 color;

uniform vec3 light_in_eye_space;
uniform vec4 Ia, Id, Is;

uniform vec4 ka, kd, ks;
uniform float s;

uniform sampler2D diffuse_ramp;
uniform sampler2D specular_ramp;


void main() {
    //color = vec4(0,0,0,1);

    vec3 l = normalize(light_in_eye_space - position_in_eye_space);
    vec3 e = normalize(-position_in_eye_space);
    vec3 n = normalize(normal_in_eye_space);
    vec3 h = normalize(l+e);

    color = ka * Ia +
            kd * Id * texture(diffuse_ramp, vec2(0.5 * dot(n, l) + 0.5, 0))+
            ks * Is * texture(specular_ramp, vec2(pow(max(0, dot(h, n)), s), 0));

}
