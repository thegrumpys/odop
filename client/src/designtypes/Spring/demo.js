import { changeSymbolValue } from '../../store/actionCreators';
export const execute = {
    "name": "demo",
    "steps": [
        {
            "name": "page1",
            "text": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere neque vitae vestibulum sollicitudin. Aliquam tristique eget urna eu scelerisque. Curabitur sit amet augue eget lacus hendrerit scelerisque quis non massa. Vivamus tortor ante, sodales eu diam sed, fermentum laoreet enim. Sed malesuada ligula in mi porttitor, ac pellentesque lorem ullamcorper. Sed et felis nec lectus gravida porta quis consectetur risus. Fusce in felis condimentum, facilisis massa vitae, efficitur magna. Nam nec libero lectus. Cras mattis urna tellus, a hendrerit quam sagittis consectetur. Donec non tortor ac elit commodo aliquam non eu tortor. Donec at dapibus nunc.</p>"+
                    "<p>Cras vel purus vitae justo finibus molestie non vel libero. Vestibulum tincidunt commodo felis. Nulla at eros sed ipsum gravida efficitur sit amet sed mi. Aliquam accumsan odio ut massa lacinia, id fringilla urna dictum. Praesent malesuada ultricies nisl eget tempus. Proin porttitor turpis enim, at semper leo scelerisque eu. Donec mi ligula, finibus vel iaculis a, venenatis et arcu. Duis efficitur varius pretium. Integer molestie mi non erat blandit scelerisque. Curabitur non consequat augue.</p>"+
                    "<p>In et eros justo. Aenean facilisis pellentesque feugiat. Sed dignissim mauris egestas tortor lobortis, at suscipit augue pretium. Maecenas finibus libero a mi hendrerit, eu auctor metus scelerisque. Morbi pretium lectus eget tellus blandit porta. Fusce sit amet tristique lacus. In hac habitasse platea dictumst. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin congue ex non urna condimentum condimentum. Duis non est sit amet metus posuere dignissim et quis mi. Proin at ipsum sed magna finibus molestie. Nunc tempus augue gravida, feugiat nibh nec, vehicula velit. Vestibulum mattis, purus a elementum maximus, mauris metus blandit ligula, in pulvinar orci justo id tortor. Vivamus urna purus, imperdiet sed quam eu, luctus consequat nisi.</p>",
            "actions": [
                changeSymbolValue('OD_Free', 2.0),
                changeSymbolValue('Wire_Dia', 0.2)
            ]
        },
        {
            "name": "page2",
            "text": "test2"
        }
    ]
}