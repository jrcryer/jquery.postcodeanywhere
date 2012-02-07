(function($) {

    $.PostCodeAnyWhere = function(elem, options) {

        var submit = function (elem, postCode) {
            var url  = "http://services.postcodeanywhere.co.uk/PostcodeAnywhere/Interactive/Find/v1.10/json2.ws?";
            url += "&Key="+options.key;
            url += "&SearchTerm=" + encodeURIComponent(postCode);
            url += "&CallbackFunction=?";
            url += "&PreferredLanguage="+options.language;
            url += "&Filter="+options.filter;

            $.getJSON(url, options.onFind);
        };

        elem.click(function(e) {
            options.onClick();
            submit(elem, $(options.postcode).attr('value'));
            e.preventDefault();
        });
    };

    // Default options
    $.PostCodeAnyWhere.defaults = {
        'onFind': function() {},
        'onClick': function() {},
        'postcode': '.postcode',
        'language': 'English',
        'filter' : 'None'
    };

    // Plugin init
    $.fn.postcodeAnywhere = function(options) {
        options = $.extend({}, $.PostCodeAnyWhere.defaults, options);

        if(!options.key) {
            return;
        }
        return this.each(function() {
            new $.PostCodeAnyWhere($(this), options);
        });
    };
})(jQuery);