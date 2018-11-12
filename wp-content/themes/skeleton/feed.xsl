<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.1">

<xsl:output method="html"/>
<xsl:variable name="title" select="/rss/channel/title"/>

<xsl:template match="/">
	<html>
		<head>
	    	<title>RSS Feed | <xsl:value-of select="$title"/></title>
		    <link rel="stylesheet" href="/wp-content/themes/skeleton/feed.css"/>
		</head>
		<body>
			<xsl:apply-templates select="rss/channel"/>
			<xsl:apply-templates select="rss/channel/item"/>

			<script language="javascript">
			var url = window.location;
			document.getElementById('feedly').href = 'http://cloud.feedly.com/#subscription/feed/' + url;
			document.getElementById('newsblur').href = 'http://www.newsblur.com/?url=' + url;
			document.getElementById('theoldreader').href = 'http://theoldreader.com/feeds/subscribe?url=' + url;
			// document.getElementById('feedwrangler').href = ; no idea
			document.getElementById('feedbin').href = 'https://feedbin.me/?subscribe=' + url;
			</script>
		</body>
	</html>
</xsl:template>

<xsl:template match="channel">
	<h1><a href="{link}"><xsl:value-of select="title"/></a></h1>
	<p>This is an RSS feed, in a special format designed to be read by a feed reader, such as:</p>
	<ul>
	    <li><a href="http://www.feedly.com/" id="feedly">Feedly</a></li>
	    <li><a href="http://www.newsblur.com/" id="newsblur">NewsBlur</a></li>
	    <li><a href="http://theoldreader.com/" id="theoldreader">The Old Reader</a></li>
	    <li><a href="http://feedwrangler.net/" id="feedwrangler">Feed Wrangler</a></li>
	    <li><a href="https://feedbin.me/" id="feedbin">Feedbin</a></li>
	</ul>
	<p>
		<cite>Nouse</cite> provides <a href="/about-nouse/rss-feeds/">a number of different feeds</a>,
		for different sections and authors,
		and for both articles and comments.
	</p>
	<hr />
	<p>These are the items currently in this RSS feed:</p>
</xsl:template>

<xsl:template match="item">
	<h2><a href="{link}" class="item"><xsl:value-of disable-output-escaping="yes" select="title"/></a></h2>
	<xsl:value-of disable-output-escaping="yes" select="description"/>
</xsl:template>

</xsl:stylesheet>