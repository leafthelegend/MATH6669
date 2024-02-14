if (typeof jQuery != 'undefined') {
    jQuery(document).ready(function($) {
        var filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3|mp4|eps|jpg|png|svg|txt|vsd|vxd|js|css|rar|wma|mov|avi|wmv)$/i;
        var baseHref = '';
        if (jQuery('base').attr('href') != undefined)
            baseHref = jQuery('base').attr('href');
        jQuery('a').each(function() {
            var href = jQuery(this).attr('href');
            if (href && (href.match(/^https?\:/i)) && (!href.match(document.domain))) {
                jQuery(this).click(function() {
                    var extLink = href.replace(/^https?\:\/\//i, '');
					// check to see if using universal analytics or classic
					if (typeof window._gaq == 'undefined') {
						ga('send', 'event', 'External Link', 'Click', extLink, {'nonInteraction': 1});
						//console.log('using: universal analytics');
                    }else{
						_gaq.push(['_trackEvent', 'External', 'Click', extLink]);
						//console.log('using: classic analytics');
					};
                    console.log('external link clicked');
                    if (jQuery(this).attr('target') != undefined && jQuery(this).attr('target').toLowerCase() != '_blank') {
                        setTimeout(function() { location.href = href; }, 200);
                        return false;
                    }
                });
            }
            else if (href && href.match(/^mailto\:/i)) {
                 jQuery(this).click(function() {
                    var mailLink = href.replace(/^mailto\:/i, '');
					if (typeof window._gaq == 'undefined') {
						ga('send', 'event', 'Email', 'Click', mailLink, {'nonInteraction': 1});
						//console.log('using: universal analytics');
                    }else{
						_gaq.push(['_trackEvent', 'External', 'Click', mailLink]);
						//console.log('using: classic analytics');
					};
                    //console.log('mail link clicked');
                });
            }
            else if (href && href.match(filetypes)) {
                 jQuery(this).click(function() {
                    var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
                    var filePath = href;
					if (typeof window._gaq == 'undefined') {
                    	ga('send', 'event', 'Download', 'Click-' + extension, filePath, {'nonInteraction': 1});
						//console.log('using: universal analytics');
					}else{
						_gaq.push(['_trackEvent', 'Download', 'Click-' + extension, filePath]);
						//console.log('using: classic analytics');
					};
                   // console.log('download clicked');
                    if (jQuery(this).attr('target') != undefined && jQuery(this).attr('target').toLowerCase() != '_blank') {
                        setTimeout(function() { location.href = baseHref + href; }, 200);
                        return false;
                    }
                });
            }
        });
    });
}