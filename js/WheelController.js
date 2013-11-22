/*
 * Copyright (c) 2012 Martin Raedlinger
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */


WheelController = (function (window, $) {


    /*******************************************
    * @class DemoApp
    *******************************************/
    function WheelController() {
        var _$controls = null;
        var _$container = null;
        var _inputRGB = null;
        var _inputHSB = null;
        var _sliderInner = null;
        var _sliderOuter = null;
        var _sliderSpacing = null;
        var _radioNone = null;
        var _radioInner = null;
        var _radioOuter = null;
        var _colorpicker = null;
        var _finalize = null;


        /**
        * constructor
        */
        function initialize() {

            var startInner = 200;
            var startOuter = 220;
            var startSpacing = 0;

            _$container = $('#container');


            // init colorpicker
            _colorpicker = new HSBColorWheel(_$container, startOuter, startInner, startSpacing, 'inner');
            _colorpicker.onChange(_colorPickerChanged);
            //_colorpicker.setRGB({ r: 0, g: 128, b: 255 });
            _colorpicker.setHSB({ h: 360, s: 1, b: 1 }, { h: 120, s: 1, b: 1 }, { h: 240, s: 1, b: 1 });
            _colorpicker.setPosition('50%', '50%');

            this.getColor = getColor;
            this.setColor = setColor;
            this.finalize = finalize;


            // update control values
            _colorPickerChanged(_colorpicker.getHSB(), _colorpicker.getRGB());
        };

        initialize();


        function _inputRgbChanged() {
            var color = _inputRGB.getText();
            color = Number(color.replace('#', '0x'));

            var rgb = {};

            if (!isNaN(color)) {
                rgb.r = (color >> 16) & 0xFF;
                rgb.g = (color >> 8) & 0xFF;
                rgb.b = color & 0xFF;

                _colorpicker.setRGB(rgb);
            }
        }

        function _inputHsbChanged() {
            var values = _inputHSB.getText().split(',');
            var hsb = {};

            hsb.h = parseFloat(values[0]);
            hsb.s = parseFloat(values[1]) / 100;
            hsb.b = parseFloat(values[2]) / 100;

            if (!isNaN(hsb.h) && !isNaN(hsb.s) && !isNaN(hsb.b)) _colorpicker.setHSB(hsb);
        }

        function finalize() {
            _colorpicker.finalize();
        }
        
        function getColor(){
            //return _colorpicker.getRGB();
            return _colorpicker.getAllHue();
        }
        
        function setColor(hue0, hue1, hue2){
            _colorpicker.setAllHue(hue0, hue1, hue2);
        }


        function _sliderRadiusChanged() {
            _colorpicker.setRadius(_sliderOuter.getValue(), _sliderInner.getValue());
        }


        function _sliderSpacingChanged() {
            _colorpicker.setSpacing(_sliderSpacing.getValue());
        }

        function _shadowChange() {
            var shadowMode = null;

            if (_radioInner.getSelected()) shadowMode = 'inner';
            else if (_radioOuter.getSelected()) shadowMode = 'outer';

            _colorpicker.setShadowMode(shadowMode);
        }





        function _colorPickerChanged(hsb, rgb) {
            //            console.log(hsb, rgb);

    //        _inputRGB.setText(uintToWebString(rgb.r << 16 | rgb.g << 8 | rgb.b));
     //       _inputHSB.setText(hsb.h.toFixed(0) + ',' + (hsb.s * 100).toFixed(0) + ',' + (hsb.b * 100).toFixed(0));
        }


        //
        // HELPER
        //


        function uintToWebString(color, len) {
            len = len || 6

            var str = color.toString(16).toUpperCase();
            while (str.length < len) str = "0" + str;
            return "#" + str.toUpperCase();
        }



    }


    //
    return WheelController;

} (window, jQuery));