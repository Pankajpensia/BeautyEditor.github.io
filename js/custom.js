(function($) {
    "use strict";

    $(document).ready(function() {
        /* Initialize Palleon plugin */
        $('#palleon').palleon({
            baseURL: "./", 
            //////////////////////* CANVAS SETTINGS *//////////////////////
            fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            fontSize: 60, 
            fontWeight: 'normal', 
            fontStyle: 'normal',
            canvasColor: 'transparent', 
            fill: '#000', 
            stroke: '#fff', 
            strokeWidth: 0, 
            textBackgroundColor: 'rgba(255,255,255,0)', 
            textAlign: 'left', 
            lineHeight: 1.2,
            borderColor: '#000',
            borderDashArray: [4, 4], 
            borderOpacityWhenMoving: 0.5, 
            borderScaleFactor: 2,
            editingBorderColor: 'rgba(0,0,0,0.5)', 
            cornerColor: '#fff', 
            cornerSize: 12,
            cornerStrokeColor: '#000', 
            cornerStyle: 'circle', 
            transparentCorners: false,
            cursorColor: '#000', 
            cursorWidth: 2,
            enableGLFiltering: true,
            textureSize: 4096,

            //////////////////////* CUSTOM FUNCTIONS *//////////////////////
            customFunctions: function(selector, canvas, lazyLoadInstance) {
           
                // Save preferences
                selector.find('#palleon-preferences-save').on('click', function() {
                    var button = $(this);
                    var settings = {};
                    var keys = [];
                    var values = [];
                    selector.find('#palleon-preferences .preference').each(function(index, value) {
                        keys.push($(this).attr('id'));
                        values.push($(this).val());
                    });

                    for (let i = 0; i < keys.length; i++) {
                        settings[keys[i]] = values[i];
                    }

                    var preferences = JSON.stringify(settings);

                    toastr.success("Setting Saved");

                });
            },


            //////////////////////* SAVE IMAGE *//////////////////////
            saveImage: function(selector, imgData) {
                var name = selector.find('#palleon-save-img-name').val();
                var quality = parseFloat(selector.find('#palleon-save-img-quality').val());
                var format = selector.find('#palleon-save-img-format').val();

                if (format == 'svg') {
                    // imgData is raw SVG code
                    var blob = new Blob([imgData], { type: 'image/svg+xml;charset=utf-8' });
                    saveAs(blob, name + '.svg'); // Using FileSaver.js for saving
                } else {
                    // imgData is a DataURL
                    var link = document.createElement('a');
                    link.href = imgData;
                    link.download = name + '.' + 'png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }

                toastr.success("Image saved successfully.", "Success");
            }
        });
    });

})(jQuery);