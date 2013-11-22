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


ColorTable = (function (window, $) {


    /*******************************************
    * @class DemoApp
    *******************************************/
    function ColorTable() {
        var _$controls = null;
        var _$container = null;
        
        var _$firstColor = null;
        var _$secondColor = null;
        var _$thirdColor = null;
        
        var _$focusColor = null
        
        var _$picker = null;
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

            

            _$picker = $('#colorPicker');
            _$firstColor = "<td align='center' class='colorCandidate'   bgcolor='#ffffff'></td>";
            _$secondColor = "<td align='center' class='colorCandidate'  bgcolor='#ffffff'></td>";
            _$thirdColor = "<td align='center' class='colorCandidate'  bgcolor='#ffffff'></td>";
            _$button = '<td align="center" ><button type="button"  style="width:100%; height:100%; "/></td>'
                        
            _$picker.append(_$firstColor);
            _$picker.append(_$secondColor);
            _$picker.append(_$thirdColor);
            _$picker.append(_$button);
            
            $('.colorCandidate').click(function() {
             _$focusColor = $(this);
            });
            
            
            _$focusColor=$('#firstColor');
            
            
            _$container = $('#colorContainer');
            for (var i=0;i<3;i++){
                var $tr = $("<tr> </tr>");
                for (var j=0;j<7;j++){
                    $tr.append("<td class='colorElement'  bgcolor='#006600'></td>");//class='colorElement'  align='center'
                }
                _$container.append($tr);
            }
            $('.colorElement').click(function() {
                _$focusColor.css("background", $(this).css("background"));
            });

            //var $tr = $("<tr> <td align='center' style='color:#ffffff' bgcolor='#006600'>000000</td></tr>");
            //_$container.append($tr);
            

//            // init colorpicker
//            _colorpicker = new HSBColorWheel(_$container, startOuter, startInner, startSpacing, 'inner');
//            _colorpicker.onChange(_colorPickerChanged);
//            //_colorpicker.setRGB({ r: 0, g: 128, b: 255 });
//            _colorpicker.setHSB({ h: 360, s: 1, b: 1 });
//            _colorpicker.setPosition('50%', '50%');
//
//            this.getColor = getColor;
//            this.finalize = finalize;
//
//
//            // update control values
//            _colorPickerChanged(_colorpicker.getHSB(), _colorpicker.getRGB());
        };

        initialize();


 
        function finalize() {
            _colorpicker.finalize();
        }
        
        function getColor(){
            return _colorpicker.getRGB();
        }
        
        function setColor(r,g,b){
            var rgb ={};
            rgb.r = r;
            rgb.g = g;
            rgb.b = b;
            _colorpicker.setRGB(rgb);
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
    return ColorTable;

} (window, jQuery));