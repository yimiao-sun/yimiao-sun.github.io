import { marked } from 'marked'


function convertMarkdownContentToHtml(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i]["content"] = marked(arr[i]["content"])
  }
  return arr
}


function convertNestedMarkdownContentToHtml(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i]["list"] = convertMarkdownContentToHtml(arr[i]["list"])
  }
  return arr
}

// accredit to https://github.com/citation-style-language
var AclCsl = `
<?xml version="1.0" encoding="utf-8"?>
<style xmlns="http://purl.org/net/xbiblio/csl" class="in-text" version="1.0" demote-non-dropping-particle="never" default-locale="en-US">
  <info>
    <title>Association for Computational Linguistics - Conference Proceedings</title>
    <title-short>ACL</title-short>
    <id>http://www.zotero.org/styles/association-for-computational-linguistics</id>
    <link href="http://www.zotero.org/styles/association-for-computational-linguistics" rel="self"/>
    <link href="http://www.aclweb.org/" rel="documentation"/>
    <!-- No stable link for style documentation; cf. acl.bst, a bibtex style file distributed in each conference. -->
    <!-- According to acl.bst, the ACL Conference Proceedings Style was based on the aaai-named format by Oren Patashnik in 1985, and later modified for the Proceedings of the ACL by Peter F. Patel-Schneider in 1988, Stuart Shieber in 1991, and Fernando Pereira in 1992. -->
    <author>
      <name>Hajime Senuma</name>
      <email>hajime.senuma@gmail.com</email>
      <uri>https://github.com/hajimes</uri>
    </author>
    <category citation-format="author-date"/>
    <category field="engineering"/>
    <category field="linguistics"/>
    <summary>CSL for papers in ACL-related conference proceedings, e.g., ACL-HLT, EACL, NAACL-HTL, and EMNLP. (But NOT for the journal "Computational Linguistics")</summary>
    <published>2013-11-20T21:00:00Z</published>
    <updated>2013-11-20T21:00:00Z</updated>
    <rights license="http://creativecommons.org/licenses/by-sa/3.0/">This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 License</rights>
  </info>
  <macro name="author">
    <names variable="author">
      <name form="long" and="text" delimiter=", "/>
      <substitute>
        <text value=""/>
      </substitute>
    </names>
  </macro>
  <macro name="author-short">
    <names variable="author">
      <name form="short" and="text" delimiter=", "/>
      <substitute>
        <names variable="editor">
          <name form="short" and="text" delimiter=", "/>
        </names>
        <text value="mis"/>
      </substitute>
    </names>
  </macro>
  <macro name="editor">
    <names variable="editor">
      <name form="long" and="text" delimiter=", "/>
      <label prefix=", " form="long"/>
    </names>
  </macro>
  <macro name="author-or-editor">
    <names variable="author">
      <name form="long" and="text" delimiter=", "/>
      <substitute>
        <text macro="editor"/>
        <text value=""/>
      </substitute>
    </names>
  </macro>
  <macro name="year-date">
    <choose>
      <if variable="issued">
        <date variable="issued">
          <date-part name="year"/>
        </date>
      </if>
      <else>
        <text value=" "/>
      </else>
    </choose>
  </macro>
  <macro name="edition">
    <choose>
      <if is-numeric="edition">
        <group delimiter=" ">
          <number variable="edition" form="ordinal"/>
          <text term="edition" form="short"/>
        </group>
      </if>
      <else>
        <text variable="edition"/>
      </else>
    </choose>
  </macro>
  <macro name="volume-or-number">
    <choose>
      <if variable="volume">
        <group delimiter=" ">
          <label variable="volume"/>
          <number variable="volume"/>
        </group>
      </if>
      <else-if variable="number">
        <group delimiter=" ">
          <text value="number"/>
          <number variable="number"/>
        </group>
      </else-if>
      <else-if variable="issue">
        <group delimiter=" ">
          <text value="number"/>
          <number variable="issue"/>
        </group>
      </else-if>
    </choose>
  </macro>
  <macro name="event-or-publisher-place">
    <choose>
      <if variable="event-place">
        <text variable="event-place"/>
      </if>
      <else>
        <text variable="publisher-place"/>
      </else>
    </choose>
  </macro>
  <macro name="thesis-type">
    <choose>
      <if variable="genre">
        <text variable="genre"/>
      </if>
      <else>
        <text value="Ph.D. thesis"/>
      </else>
    </choose>
  </macro>
  <macro name="volume-and-collection-title">
    <choose>
      <if variable="volume collection-title" match="all">
        <group delimiter=" ">
          <text term="volume"/>
          <number variable="volume"/>
          <text value="of"/>
          <text variable="collection-title" font-style="italic"/>
        </group>
      </if>
      <else-if variable="volume">
        <group delimiter=" ">
          <text term="volume"/>
          <number variable="volume"/>
        </group>
      </else-if>
      <!-- TODO: else-if for issue or number-->
      <else>
        <text variable="collection-title"/>
      </else>
    </choose>
  </macro>
  <macro name="technical-report">
    <choose>
      <if variable="number issue" match="any">
        <group delimiter=" ">
          <!-- uppercased "report" -->
          <text value="Technical Report"/>
          <choose>
            <if variable="number">
              <text variable="number"/>
            </if>
            <else>
              <text variable="issue"/>
            </else>
          </choose>
        </group>
      </if>
      <else>
        <!-- lowercased "report" -->
        <text value="Technical report"/>
      </else>
    </choose>
  </macro>
  <citation et-al-min="3" et-al-use-first="1" disambiguate-add-year-suffix="true">
    <!-- no sorting for citation -->
    <layout prefix="(" suffix=")" delimiter="; ">
      <text macro="author-short"/>
      <text macro="year-date" prefix=", "/>
    </layout>
  </citation>
  <bibliography et-al-min="20" et-al-use-first="19">
    <sort>
      <key macro="author-or-editor"/>
      <key macro="year-date"/>
      <key variable="title"/>
    </sort>
    <layout>
      <!-- author -->
      <choose>
        <if type="book">
          <text macro="author-or-editor" suffix="."/>
        </if>
        <else>
          <text macro="author" suffix="."/>
        </else>
      </choose>
      <!-- year -->
      <date variable="issued" prefix=" " suffix=".">
        <date-part name="year"/>
      </date>
      <!-- title and other information -->
      <choose>
        <!-- corresponds to "article" in bibtex -->
        <if type="article-journal">
          <text variable="title" prefix=" " suffix="."/>
          <group prefix=" " suffix=".">
            <text variable="container-title" font-style="italic"/>
            <text variable="volume" prefix=", "/>
            <text variable="issue" prefix="(" suffix=")"/>
            <text variable="page" prefix=":"/>
          </group>
        </if>
        <!-- corresponds to "proceedings", "manual", "book", and "periodical" in bibtex -->
        <else-if type="book">
          <text variable="title" prefix=" " suffix="." font-style="italic"/>
          <group delimiter=", " suffix=".">
            <text macro="volume-and-collection-title"/>
          </group>
          <group delimiter=", " prefix=" " suffix=".">
            <text variable="publisher"/>
            <text variable="publisher-place"/>
            <text macro="edition"/>
          </group>
        </else-if>
        <!-- corresponds to "inbook" and "incollection" in bibtex -->
        <else-if type="chapter">
          <text variable="title" prefix=" " suffix="."/>
          <text term="in" text-case="capitalize-first" prefix=" " suffix=" "/>
          <group delimiter=", " suffix=".">
            <text macro="editor"/>
            <text variable="container-title" font-style="italic"/>
            <text macro="volume-and-collection-title"/>
            <group delimiter=" ">
              <text term="chapter"/>
              <number variable="chapter-number"/>
            </group>
            <group delimiter=" ">
              <label variable="page"/>
              <text variable="page"/>
            </group>
          </group>
          <group delimiter=", " prefix=" " suffix=".">
            <text variable="publisher"/>
            <text variable="publisher-place"/>
            <text macro="edition"/>
          </group>
        </else-if>
        <!-- corresponds to "booklet" in bibtex -->
        <else-if type="pamphlet">
          <text variable="title" prefix=" " suffix="."/>
          <group delimiter=", " prefix=" " suffix=".">
            <text variable="publisher-place"/>
          </group>
        </else-if>
        <!-- corresponds to "inproceedings" and "conference" in bibtex -->
        <else-if type="paper-conference">
          <text variable="title" prefix=" " suffix=". "/>
          <text term="in" text-case="capitalize-first" suffix=" "/>
          <group suffix="." delimiter=", ">
            <text macro="editor"/>
            <text variable="container-title" font-style="italic"/>
            <text macro="volume-or-number"/>
            <group delimiter=" ">
              <label variable="page"/>
              <text variable="page"/>
            </group>
            <choose>
              <if variable="event-place publisher-place" match="any">
                <text macro="event-or-publisher-place"/>
              </if>
            </choose>
          </group>
          <text variable="publisher" prefix=" " suffix="."/>
        </else-if>
        <!-- corresponds to "techreport" in bibtex -->
        <else-if type="report">
          <text variable="title" prefix=" " suffix="."/>
          <group delimiter=", " prefix=" " suffix=".">
            <text macro="technical-report"/>
            <text variable="publisher"/>
            <text variable="publisher-place"/>
          </group>
        </else-if>
        <!-- corresponds to "phdthesis" and "masterthesis" in bibtex -->
        <else-if type="thesis">
          <text variable="title" prefix=" " suffix="." font-style="italic"/>
          <group delimiter=", " prefix=" " suffix=".">
            <!-- If you want to output text other than "Ph.D thesis", specify the "genre" field to an appropriate value like "Master's thesis".-->
            <text macro="thesis-type"/>
            <text variable="publisher"/>
            <text variable="publisher-place"/>
          </group>
        </else-if>
        <!-- misc. -->
        <else>
          <text variable="title" prefix=" " suffix="."/>
        </else>
      </choose>
      <!-- note -->
      <text variable="note" prefix=" " suffix="."/>
    </layout>
  </bibliography>
</style>
`

var Gb7714Csl = `
<?xml version="1.0" encoding="utf-8"?>
<style xmlns="http://purl.org/net/xbiblio/csl" version="1.0" class="in-text" names-delimiter=". " name-as-sort-order="all" sort-separator=" " demote-non-dropping-particle="never" initialize-with=" " initialize-with-hyphen="false" page-range-format="expanded" default-locale="zh-CN">
  <info>
    <title>China National Standard GB/T 7714-2015 (author-date, 中文)</title>
    <id>http://www.zotero.org/styles/china-national-standard-gb-t-7714-2015-author-date</id>
    <link href="http://www.zotero.org/styles/china-national-standard-gb-t-7714-2015-author-date" rel="self"/>
    <link href="http://www.zotero.org/styles/china-national-standard-gb-t-7714-2015-numeric" rel="template"/>
    <link href="http://std.samr.gov.cn/gb/search/gbDetailed?id=71F772D8055ED3A7E05397BE0A0AB82A" rel="documentation"/>
    <author>
      <name>牛耕田</name>
      <email>buffalo_d@163.com</email>
    </author>
    <contributor>
      <name>Zeping Lee</name>
      <email>zepinglee@gmail.com</email>
    </contributor>
    <category citation-format="author-date"/>
    <category field="generic-base"/>
    <summary>The Chinese GB/T 7714-2015 author-date style</summary>
    <updated>2022-01-20T00:00:00+08:00</updated>
    <rights license="http://creativecommons.org/licenses/by-sa/3.0/">This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 License</rights>
  </info>
  <locale xml:lang="zh-CN">
    <date form="text">
      <date-part name="year" suffix="年" range-delimiter="&#8212;"/>
      <date-part name="month" form="numeric" suffix="月" range-delimiter="&#8212;"/>
      <date-part name="day" suffix="日" range-delimiter="&#8212;"/>
    </date>
    <terms>
      <term name="anonymous" form="short">佚名</term>
      <term name="edition" form="short">版</term>
      <term name="open-quote">“</term>
      <term name="close-quote">”</term>
      <term name="open-inner-quote">‘</term>
      <term name="close-inner-quote">’</term>
    </terms>
  </locale>
  <locale>
    <date form="numeric">
      <date-part name="year" range-delimiter="/"/>
      <date-part name="month" form="numeric-leading-zeros" prefix="-" range-delimiter="/"/>
      <date-part name="day" form="numeric-leading-zeros" prefix="-" range-delimiter="/"/>
    </date>
    <terms>
      <term name="page-range-delimiter">-</term>
    </terms>
  </locale>
  <!-- 引用日期 -->
  <macro name="accessed-date">
    <date variable="accessed" form="numeric" prefix="[" suffix="]"/>
  </macro>
  <macro name="anon">
    <text term="anonymous" form="short" text-case="capitalize-first" strip-periods="true"/>
  </macro>
  <!-- 主要责任者 -->
  <macro name="author">
    <names variable="author">
      <name>
        <name-part name="family" text-case="uppercase"/>
        <name-part name="given"/>
      </name>
      <substitute>
        <names variable="composer"/>
        <names variable="illustrator"/>
        <names variable="director"/>
        <choose>
          <if variable="container-title" match="none">
            <names variable="editor"/>
          </if>
        </choose>
        <text macro="anon"/>
      </substitute>
    </names>
  </macro>
  <!-- 参考文献表的著者姓名与出版年 -->
  <macro name="author-date">
    <group delimiter=", ">
      <text macro="author"/>
      <text macro="issued-year"/>
    </group>
  </macro>
  <!-- 正文引用的著者姓名 -->
  <macro name="author-intext">
    <names variable="author">
      <!-- 国标 10.2.2 节要求姓氏与“et al.”“等”之间留适当空隙 -->
      <name form="short" delimiter="&#160;" delimiter-precedes-et-al="always">
        <name-part name="family" text-case="uppercase"/>
      </name>
      <substitute>
        <names variable="composer"/>
        <names variable="illustrator"/>
        <names variable="director"/>
        <choose>
          <if variable="container-title" match="none">
            <names variable="editor"/>
          </if>
        </choose>
        <text macro="anon"/>
      </substitute>
    </names>
  </macro>
  <!-- 书籍的卷号（“第 x 卷”或“第 x 册”） -->
  <macro name="book-volume">
    <choose>
      <if type="article article-journal article-magazine article-newspaper periodical" match="none">
        <choose>
          <if is-numeric="volume">
            <group delimiter=" ">
              <label variable="volume" form="short" text-case="capitalize-first"/>
              <text variable="volume"/>
            </group>
          </if>
          <else>
            <text variable="volume"/>
          </else>
        </choose>
      </if>
    </choose>
  </macro>
  <!-- 专著主要责任者 -->
  <macro name="container-author">
    <names variable="editor">
      <name>
        <name-part name="family" text-case="uppercase"/>
        <name-part name="given"/>
      </name>
      <substitute>
        <names variable="editorial-director"/>
        <names variable="collection-editor"/>
        <names variable="container-author"/>
      </substitute>
    </names>
  </macro>
  <!-- 专著题名 -->
  <macro name="container-title">
    <group delimiter=", ">
      <group delimiter=": ">
        <choose>
          <if variable="container-title">
            <text variable="container-title"/>
          </if>
          <else>
            <text variable="event"/>
          </else>
        </choose>
        <text macro="book-volume"/>
      </group>
      <choose>
        <if variable="event-date">
          <date variable="event-date" form="text"/>
          <text variable="event-place"/>
        </if>
      </choose>
    </group>
  </macro>
  <!-- 版本项 -->
  <macro name="edition">
    <choose>
      <if is-numeric="edition">
        <group delimiter=" ">
          <number variable="edition" form="ordinal"/>
          <text term="edition" form="short"/>
        </group>
      </if>
      <else>
        <text variable="edition"/>
      </else>
    </choose>
  </macro>
  <!-- 电子资源的更新或修改日期 -->
  <macro name="issued-date">
    <date variable="issued" form="numeric"/>
  </macro>
  <!-- 出版年 -->
  <macro name="issued-year">
    <choose>
      <if is-uncertain-date="issued">
        <date variable="issued" prefix="[" suffix="]">
          <date-part name="year" range-delimiter="-"/>
        </date>
      </if>
      <else>
        <date variable="issued">
          <date-part name="year" range-delimiter="-"/>
        </date>
      </else>
    </choose>
  </macro>
  <!-- 专著的出版项 -->
  <macro name="publishing">
    <group delimiter=": ">
      <group delimiter=", ">
        <group delimiter=": ">
          <text variable="publisher-place"/>
          <text variable="publisher"/>
        </group>
      </group>
      <text variable="page"/>
    </group>
    <choose>
      <!-- 纯电子资源显示“更新或修改日期” -->
      <if variable="publisher page" type="book chapter paper-conference thesis" match="none">
        <choose>
          <if variable="URL DOI" match="any">
            <text macro="issued-date" prefix="(" suffix=")"/>
          </if>
        </choose>
      </if>
    </choose>
    <text macro="accessed-date"/>
  </macro>
  <!-- 其他责任者 -->
  <macro name="secondary-contributor">
    <names variable="translator">
      <name>
        <name-part name="family" text-case="uppercase"/>
        <name-part name="given"/>
      </name>
      <label form="short" prefix=", "/>
    </names>
  </macro>
  <!-- 连续出版物中的析出文献的出处项（年、卷、期等信息） -->
  <macro name="periodical-publishing">
    <group>
      <group delimiter=": ">
        <group>
          <group delimiter=", ">
            <text macro="container-title" text-case="title"/>
            <choose>
              <if type="article-newspaper">
                <text macro="issued-date"/>
              </if>
            </choose>
            <text variable="volume"/>
          </group>
          <text variable="issue" prefix="(" suffix=")"/>
        </group>
        <text variable="page"/>
      </group>
      <text macro="accessed-date"/>
    </group>
  </macro>
  <!-- 题名 -->
  <macro name="title">
    <group delimiter=", ">
      <group delimiter=": ">
        <text variable="title"/>
        <group delimiter="&#8195;">
          <choose>
            <if variable="container-title" type="paper-conference" match="none">
              <text macro="book-volume"/>
            </if>
          </choose>
          <choose>
            <if type="bill legal_case legislation patent regulation report standard" match="any">
              <text variable="number"/>
            </if>
          </choose>
        </group>
      </group>
      <choose>
        <if variable="container-title" type="paper-conference" match="none">
          <choose>
            <if variable="event-date">
              <text variable="event-place"/>
              <date variable="event-date" form="text"/>
            </if>
          </choose>
        </if>
      </choose>
    </group>
    <text macro="type-code" prefix="[" suffix="]"/>
  </macro>
  <!-- 文献类型标识 -->
  <macro name="type-code">
    <group delimiter="/">
      <choose>
        <if type="article">
          <choose>
            <if variable="archive">
              <text value="A"/>
            </if>
            <else>
              <text value="M"/>
            </else>
          </choose>
        </if>
        <else-if type="article-journal article-magazine periodical" match="any">
          <text value="J"/>
        </else-if>
        <else-if type="article-newspaper">
          <text value="N"/>
        </else-if>
        <else-if type="bill collection legal_case legislation regulation" match="any">
          <text value="A"/>
        </else-if>
        <else-if type="book chapter" match="any">
          <text value="M"/>
        </else-if>
        <else-if type="dataset">
          <text value="DS"/>
        </else-if>
        <else-if type="map">
          <text value="CM"/>
        </else-if>
        <else-if type="paper-conference">
          <text value="C"/>
        </else-if>
        <else-if type="patent">
          <text value="P"/>
        </else-if>
        <else-if type="post post-weblog webpage" match="any">
          <text value="EB"/>
        </else-if>
        <else-if type="report">
          <text value="R"/>
        </else-if>
        <else-if type="software">
          <text value="CP"/>
        </else-if>
        <else-if type="standard">
          <text value="S"/>
        </else-if>
        <else-if type="thesis">
          <text value="D"/>
        </else-if>
        <else>
          <text value="Z"/>
        </else>
      </choose>
      <choose>
        <if variable="URL DOI" match="any">
          <text value="OL"/>
        </if>
      </choose>
    </group>
  </macro>
  <!-- 获取和访问路径以及 DOI -->
  <macro name="url-doi">
    <group delimiter=". ">
      <text variable="URL"/>
      <text variable="DOI" prefix="DOI:"/>
    </group>
  </macro>
  <!-- 连续出版物的年卷期 -->
  <macro name="year-volume-issue">
    <group>
      <group delimiter=", ">
        <text macro="issued-year"/>
        <text variable="volume"/>
      </group>
      <text variable="issue" prefix="(" suffix=")"/>
    </group>
  </macro>
  <!-- 专著和电子资源 -->
  <macro name="monograph-layout">
    <group delimiter=". " suffix=".">
      <text macro="author-date"/>
      <text macro="title"/>
      <text macro="secondary-contributor"/>
      <text macro="edition"/>
      <text macro="publishing"/>
      <text macro="url-doi"/>
    </group>
  </macro>
  <!-- 专著中的析出文献 -->
  <macro name="chapter-in-book-layout">
    <group delimiter=". " suffix=".">
      <text macro="author-date"/>
      <group delimiter="//">
        <group delimiter=". ">
          <text macro="title"/>
          <text macro="secondary-contributor"/>
        </group>
        <group delimiter=". ">
          <text macro="container-author"/>
          <text macro="container-title"/>
        </group>
      </group>
      <text macro="edition"/>
      <text macro="publishing"/>
      <text macro="url-doi"/>
    </group>
  </macro>
  <!-- 连续出版物 -->
  <macro name="serial-layout">
    <group delimiter=". " suffix=".">
      <text macro="author-date"/>
      <text macro="title"/>
      <text macro="year-volume-issue"/>
      <text macro="publishing"/>
      <text variable="URL"/>
      <text variable="DOI" prefix="DOI:"/>
    </group>
  </macro>
  <!-- 连续出版物中的析出文献 -->
  <macro name="article-in-periodical-layout">
    <group delimiter=". " suffix=".">
      <text macro="author-date"/>
      <text macro="title"/>
      <text macro="periodical-publishing"/>
      <text macro="url-doi"/>
    </group>
  </macro>
  <!-- 专利文献 -->
  <macro name="patent-layout">
    <group delimiter=". " suffix=".">
      <text macro="author-date"/>
      <text macro="title"/>
      <group>
        <text macro="issued-date"/>
        <text macro="accessed-date"/>
      </group>
      <text macro="url-doi"/>
    </group>
  </macro>
  <!-- 正文中引用的文献标注格式 -->
  <macro name="citation-layout">
    <group>
      <group delimiter=", ">
        <text macro="author-intext"/>
        <text macro="issued-year"/>
      </group>
    </group>
  </macro>
  <!-- 参考文献表格式 -->
  <macro name="entry-layout">
    <choose>
      <if type="article-journal article-magazine article-newspaper" match="any">
        <text macro="article-in-periodical-layout"/>
      </if>
      <else-if type="periodical">
        <text macro="serial-layout"/>
      </else-if>
      <else-if type="patent">
        <text macro="patent-layout"/>
      </else-if>
      <else-if type="paper-conference" variable="container-title" match="any">
        <text macro="chapter-in-book-layout"/>
      </else-if>
      <else>
        <text macro="monograph-layout"/>
      </else>
    </choose>
  </macro>
  <citation et-al-min="2" et-al-use-first="1" disambiguate-add-year-suffix="true" disambiguate-add-names="true" disambiguate-add-givenname="true" givenname-disambiguation-rule="primary-name-with-initials" collapse="year">
    <!-- 取消这部分注释可以使用 CSL-M 的功能支持双语 -->
    <!-- <layout prefix="(" suffix=")" delimiter="; " locale="en"><text macro="citation-layout"/></layout> -->
    <layout prefix="(" suffix=")" delimiter="; ">
      <text macro="citation-layout"/>
    </layout>
  </citation>
  <bibliography entry-spacing="0" et-al-min="4" et-al-use-first="3" hanging-indent="true">
    <sort>
      <key macro="author"/>
      <key macro="issued-year"/>
      <key variable="title"/>
    </sort>
    <!-- 取消这部分注释可以使用 CSL-M 的功能支持双语 -->
    <!-- <layout locale="en"><text macro="entry-layout"/></layout> -->
    <layout>
      <text macro="entry-layout"/>
    </layout>
  </bibliography>
</style>
`

export {
  convertMarkdownContentToHtml,
  convertNestedMarkdownContentToHtml,
  marked as convertMarkdownToHtml,
  AclCsl,
  Gb7714Csl,
}