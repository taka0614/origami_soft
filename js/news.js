// news-data.js
// ここに「お知らせ記事」の情報をまとめて置いておきます。
// 記事を増やしたいときは、下の配列(はいれつ)に { } のかたまりを1つ追加するだけでOKです。
// 将来Notion/WordPressに移行するときは、このファイルの中身がAPIから取得したデータに置き換わるイメージです。



// news.js
// ① 記事データ本体(前回作った内容そのまま)
const newsData = [{
        id: "news-001",
        title: "ウェブサイトをリニューアルしました",
        date: "2026-09-01",
        thumbnail: "imgs/news/thumb-001.jpg",
        excerpt: "この度、公式サイトを全面的にリニューアルいたしました。",
        body: "この度、公式サイトを全面的にリニューアルいたしました。より見やすく、スマートフォンでも快適にご覧いただけるようになりました。今後ともよろしくお願いいたします。"
    },
    {
        id: "news-002",
        title: "秋の新商品のお知らせ",
        date: "2026-09-10",
        thumbnail: "imgs/news/thumb-002.jpg",
        excerpt: "秋限定の新しいフレーバーが登場しました。",
        body: "秋限定の新しいフレーバーが登場しました。数量限定となりますので、お早めにお試しください。"
    },
    {
        id: "news-003",
        title: "【新商品】折り紙のように層が重なる「立体パフェ・極み」が狸小路店限定で登場！",
        date: "2026-09-15",
        thumbnail: "imgs/origami-vanilla-soft.webp",
        excerpt: "「立体パフェ」登場！",
        body: "独自開発した超薄型ラングドシャを職人が1枚ずつ繊細に折りたたみ、まるで折り鶴のような芸術的シルエットに仕上げた新作パフェ。" +
            "濃厚な北海道産ジャージーミルクとビターチョコの階層が生み出す、 かつてない「 サクサク× とろ〜り」の食感コントラストをぜひ店頭でお確かめください。 "
    },
    {
        id: "news-004",
        title: "イベント出店のお知らせ",
        date: "2026-09-20",
        thumbnail: "imgs/news/thumb-004.jpg",
        excerpt: "地域のマルシェイベントに出店します。",
        body: "地域のマルシェイベントに出店することになりました。ぜひ会場に遊びに来てください。"
    },
    {
        id: "news-005",
        title: "メディア掲載のお知らせ",
        date: "2026-09-24",
        thumbnail: "imgs/news/thumb-005.jpg",
        excerpt: "地元情報誌に紹介記事が掲載されました。",
        body: "地元情報誌にて、当店の取り組みが紹介されました。詳しくは記事をご覧ください。"
    }
];



// 気をつけるポイント
// 01.idは必ずユニークにする(他の記事と被らない名前にする)。詳細ページはこのidを頼りに記事を探しているので、被ると先に見つかった方が表示されてしまいます。
// 02.配列に追加する時、直前の要素の末尾に,(カンマ)を忘れない。JSでは{ }と{ }の間を,で区切るルールなので、これを忘れるとエラーになります。
// 03.配列の中のどの位置に追加してもOK。renderNewsCardsが日付(date)を見て新しい順に自動で並び替えてくれるので、書く順番は気にしなくて大丈夫です。
// 04.画像のパスはhtmlから見た位置。

//改行方法
//各行の文字列の末尾に+を書くことで、「この文字列は次の行に続きます」という意味になります
//+は文字列同士をつなげる(結合する)演算子なので、実際には3つの文字列が1本につながった状態としてブラウザに渡り、画面上は改行なしで表示されます
//見た目のインデント(行頭の空白)は単にコードを読みやすくするためのもので、文字列の中身には含まれません

//見た目に反映させる改行
//[\n]をbrタグのように使う、/n/nとすると二行改行される
//シングルクォートでもできる
//cssの本文表示プロパティに white-space: pre-line;この記述をいれること

// これだけで、トップの新着3件・一覧ページ・詳細ページの3箇所すべてに自動で反映されます。HTMLファイルを新しく作ったり、
// 他のファイルを触ったりする必要は一切ありません。これがまさに、最初に「データとテンプレートを分ける」設計にした狙いでした。






// ② newsDataから、指定した件数だけカードのHTMLを自動生成して画面に表示する関数
//    containerId: カードを差し込みたい場所のid(例: "news-top" や "news-list")
//    count: 表示したい件数。省略すると全件表示する
function renderNewsCards(containerId, count) {
    // 元のnewsDataは書き換えたくないので、コピーしてから日付が新しい順に並び替える
    const sorted = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));

    // countが指定されていればその件数だけ、なければ全件を使う
    const target = count ? sorted.slice(0, count) : sorted;

    // 記事1件ずつ、カード用のHTML文字列を作る(mapで配列の中身を変換している)
    const cardsHtml = target.map(function (article) {
        return `
      <a class="news-card" href="news-article.html?id=${article.id}">
        <img src="${article.thumbnail}" alt="${article.title}">
        <p class="news-card__date">${article.date}</p>
        <h3 class="news-card__title">${article.title}</h3>
        <p class="news-card__excerpt">${article.excerpt}</p>
      </a>
    `;
    }).join(""); // 配列を1本の文字列につなげる

    // 指定したidの要素の中身を、今作ったHTMLに書き換える
    document.getElementById(containerId).innerHTML = cardsHtml;
}



function renderNewsDetail() {
    // ① URLの ?id=xxx の部分を取り出す
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // ② newsDataの中から、idが一致する記事を1件探す
    const article = newsData.find(function (item) {
        return item.id === id;
    });

    // ③ 見つからなかった場合の保険
    if (!article) {
        document.getElementById("news-detail-title").textContent = "記事が見つかりませんでした";
        return;
    }


    // ★ここを追加:画像のsrcとaltを差し込む
    const thumbnailEl = document.getElementById("news-detail-thumbnail");
    thumbnailEl.src = article.thumbnail;
    thumbnailEl.alt = article.title;


    // ④ 見つかった記事の情報を、それぞれの場所に差し込む
    document.getElementById("news-detail-date").textContent = article.date;
    document.getElementById("news-detail-title").textContent = article.title;
    document.getElementById("news-detail-body").textContent = article.body;
}