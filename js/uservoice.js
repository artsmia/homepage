<!-- UserVoice JavaScript SDK (only needed once on a page) -->
(function(){var uv=document.createElement('script');uv.type='text/javascript';uv.async=true;uv.src='//widget.uservoice.com/JTjb9W4NZUVr3VrEoi7Rfg.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(uv,s)})()


<!-- A function to launch the Classic Widget -->
UserVoice = window.UserVoice || [];
function showClassicWidget() {
     UserVoice.push(['showLightbox', 'classic_widget', {
            mode: 'full',
            primary_color: '#cc6d00',
            link_color: '#007dbf',
            default_mode: 'feedback',
            forum_id: 210346
          }]);
}
