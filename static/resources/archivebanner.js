/* Javascript is a horrible, horrible language! */

function archivebanner(sitetitle) {

bannerdiv = document.createElement('div');
bannerdiv.setAttribute("id", "archivebanner");

bannerinner = "<span id='archivebannerleft'><a href='/nouse-archives/mini-sites/'>&larr; back to the archives</a></span>This is an archived version of the <strong>" + sitetitle + "</strong> mini-site.";

bannerdiv.innerHTML = bannerinner;

body = document.getElementsByTagName('body')[0]
body.appendChild(bannerdiv)

}
