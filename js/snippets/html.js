const HTML = [

`<!DOCTYPE html>
<!-- DOCTYPE tells the browser this is an HTML5 document -->
<!-- Without it, browsers may render in "quirks mode" -->

<html lang="en">
<!-- html: the root element that wraps the entire page -->
<!-- lang="en" tells search engines and screen readers the language -->

<head>
  <!-- head: contains metadata — nothing here is shown on screen -->

  <meta charset="UTF-8">
  <!-- charset UTF-8 supports almost every character in the world -->

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- viewport: prevents mobile browsers from zooming out by default -->

  <title>My First Page</title>
  <!-- title: shown on the browser tab and in search results -->

  <link rel="stylesheet" href="style.css">
  <!-- link: connects an external CSS file to this page -->
  <!-- rel="stylesheet" says what kind of resource it is -->
</head>

<body>
  <!-- body: everything visible on the page goes here -->

  <h1>Hello, World!</h1>
  <!-- h1: the most important heading; use only once per page -->

  <p>Welcome to my first webpage.</p>
  <!-- p: a paragraph of text -->
</body>
</html>`,

`<!-- Headings & Text elements -->
<body>

  <!-- h1 through h6: headings in descending importance -->
  <h1>Page Title — most important</h1>
  <h2>Section Heading</h2>
  <h3>Subsection Heading</h3>

  <!-- p: block-level paragraph -->
  <p>This is a regular paragraph.</p>

  <!-- Inline text formatting elements -->
  <p>
    <strong>strong</strong> makes text bold and signals importance.
    <em>em</em> makes text italic and adds emphasis.
    <code>code</code> displays text in a monospace font.
    <mark>mark</mark> highlights text in yellow by default.
    <del>del</del> shows strikethrough (deleted content).
    <abbr title="HyperText Markup Language">HTML</abbr>
    <!-- abbr: shows a tooltip with the full form on hover -->
  </p>

  <!-- br: a line break (self-closing, no content) -->
  <p>Line one.<br>Line two (same paragraph).</p>

  <!-- hr: a thematic break — rendered as a horizontal line -->
  <hr>

  <p>Content after the divider.</p>

</body>`,

`<!-- Links & Images -->
<body>

  <!-- a: anchor element — creates a hyperlink -->
  <!-- href: the URL the link points to -->
  <a href="https://example.com">Visit Example</a>

  <!-- target="_blank": open in a new browser tab -->
  <!-- rel="noopener noreferrer": security best practice for _blank links -->
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
    Open in new tab
  </a>

  <!-- Link to a section on the same page using its id -->
  <a href="#about">Jump to About section</a>

  <!-- img: embed an image (self-closing) -->
  <!-- src: path to the image file -->
  <!-- alt: text shown if image fails to load; also read by screen readers -->
  <!-- width/height: reserve space so the page doesn't jump when image loads -->
  <img
    src="photo.jpg"
    alt="A photo of the mountains"
    width="800"
    height="450"
  >

  <!-- The section we linked to above -->
  <section id="about">
    <h2>About</h2>
    <p>This section is the jump target.</p>
  </section>

</body>`,

`<!-- Lists -->
<body>

  <!-- ul: unordered list — items rendered as bullet points -->
  <ul>
    <li>HTML</li>
    <!-- li: one list item; used inside ul, ol, or menu -->
    <li>CSS</li>
    <li>JavaScript</li>
  </ul>

  <!-- ol: ordered list — items numbered automatically -->
  <ol>
    <li>Install Node.js</li>
    <li>Run npm install</li>
    <li>Run npm start</li>
  </ol>

  <!-- start attribute: begin numbering at a different number -->
  <ol start="3">
    <li>This is item 3</li>
    <li>This is item 4</li>
  </ol>

  <!-- Nested list: a ul or ol inside an li -->
  <ul>
    <li>Frontend
      <ul>
        <li>React</li>
        <li>Vue</li>
      </ul>
    </li>
    <li>Backend
      <ul>
        <li>Node.js</li>
        <li>Python</li>
      </ul>
    </li>
  </ul>

  <!-- dl: description list — term + definition pairs -->
  <dl>
    <dt>HTML</dt>   <!-- dt: the term -->
    <dd>HyperText Markup Language — structures web content.</dd>
    <!-- dd: the description / definition -->
    <dt>CSS</dt>
    <dd>Cascading Style Sheets — controls visual presentation.</dd>
  </dl>

</body>`,

`<!-- Forms & Inputs -->
<body>

  <!-- form: groups inputs and sends data to a server -->
  <!-- action: URL that receives the submitted data -->
  <!-- method: "get" appends data to URL; "post" sends in request body -->
  <form action="/submit" method="post">

    <!-- label + for: clicking the label focuses the linked input -->
    <!-- for must match the input's id -->
    <label for="username">Username</label>
    <input
      type="text"
      id="username"
      name="username"
      placeholder="Enter your name"
      required
      <!-- required: browser blocks submit if this field is empty -->
    >

    <label for="email">Email</label>
    <input type="email" id="email" name="email" required>
    <!-- type="email": browser validates the email format automatically -->

    <label for="password">Password</label>
    <input type="password" id="password" name="password">
    <!-- type="password": characters are hidden as dots -->

    <label for="age">Age</label>
    <input type="number" id="age" name="age" min="0" max="120">
    <!-- min/max: browser rejects values outside this range -->

    <!-- textarea: multi-line text input -->
    <label for="bio">Bio</label>
    <textarea id="bio" name="bio" rows="4" cols="40"></textarea>

    <!-- button type="submit": sends the form data -->
    <button type="submit">Send</button>

  </form>

</body>`,

`<!-- Semantic layout elements -->
<body>

  <!-- header: introductory content — site logo, nav, tagline -->
  <header>
    <h1>Mushin Code</h1>
    <nav>
      <!-- nav: a group of navigation links -->
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>

  <!-- main: the primary unique content of the page -->
  <!-- There should be only one main per page -->
  <main>

    <!-- article: self-contained content that makes sense on its own -->
    <article>
      <h2>Blog Post Title</h2>
      <p>Post content goes here...</p>
    </article>

    <!-- aside: content tangentially related to the main content -->
    <aside>
      <h3>Related Links</h3>
      <ul>
        <li><a href="#">Link 1</a></li>
      </ul>
    </aside>

  </main>

  <!-- footer: closing content — copyright, links, contact info -->
  <footer>
    <p>Copyright 2026 Ichito Watanabe</p>
  </footer>

</body>`,

`<!-- Tables -->
<body>

  <!-- table: displays data in rows and columns -->
  <table>

    <!-- thead: groups the header rows -->
    <thead>
      <tr>
        <!-- tr: table row -->
        <th scope="col">Name</th>
        <!-- th: header cell; bold and centered by default -->
        <!-- scope="col" tells screen readers this header describes a column -->
        <th scope="col">Language</th>
        <th scope="col">Score</th>
      </tr>
    </thead>

    <!-- tbody: groups the body rows (the actual data) -->
    <tbody>
      <tr>
        <td>Ichito</td>
        <!-- td: data cell — regular table content -->
        <td>Python</td>
        <td>95</td>
      </tr>
      <tr>
        <td>Alice</td>
        <td>TypeScript</td>
        <td>88</td>
      </tr>
    </tbody>

    <!-- tfoot: groups the footer rows (totals, summaries) -->
    <tfoot>
      <tr>
        <td colspan="2">Average</td>
        <!-- colspan: this cell spans 2 columns -->
        <td>91.5</td>
      </tr>
    </tfoot>

  </table>

</body>`,

`<!-- Audio, Video & Iframe -->
<body>

  <!-- audio: embeds a sound file -->
  <!-- controls: shows the browser's play/pause/volume UI -->
  <audio controls>
    <!-- source: browser picks the first format it can play -->
    <source src="music.mp3" type="audio/mpeg">
    <source src="music.ogg" type="audio/ogg">
    Your browser does not support audio.
    <!-- Fallback text shown if browser can't play any source -->
  </audio>

  <!-- video: embeds a video file -->
  <!-- autoplay muted: starts playing silently (muted is required for autoplay) -->
  <!-- loop: restarts when it reaches the end -->
  <!-- poster: image shown before the video starts -->
  <video
    controls
    width="640"
    height="360"
    poster="thumbnail.jpg"
  >
    <source src="demo.mp4"  type="video/mp4">
    <source src="demo.webm" type="video/webm">
    Your browser does not support video.
  </video>

  <!-- iframe: embeds another webpage inside this page -->
  <!-- sandbox: restricts what the embedded page can do -->
  <iframe
    src="https://example.com"
    width="600"
    height="400"
    title="Example website"
    sandbox
  ></iframe>

</body>`,

`<!-- Meta tags & SEO -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Description: shown in Google search results -->
  <!-- Keep under 160 characters -->
  <meta name="description" content="A calm typing practice site for programmers.">

  <!-- Keywords: less important now, but still used by some engines -->
  <meta name="keywords" content="typing, code, programming, practice">

  <!-- Author: credits the page creator -->
  <meta name="author" content="Ichito Watanabe">

  <!-- Open Graph: controls how the page looks when shared on social media -->
  <meta property="og:title"       content="Mushin Code">
  <meta property="og:description" content="Type code. Find calm.">
  <meta property="og:image"       content="https://example.com/og-image.png">
  <meta property="og:url"         content="https://example.com">
  <meta property="og:type"        content="website">

  <!-- Twitter Card: similar to OG, but for Twitter/X -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="Mushin Code">
  <meta name="twitter:description" content="Type code. Find calm.">
  <meta name="twitter:image"       content="https://example.com/og-image.png">

  <title>Mushin Code — Typing Practice</title>
</head>`,

`<!-- Accessibility attributes -->
<body>

  <!-- role: tells assistive technology what this element does -->
  <!-- Use semantic HTML first; role is a fallback -->
  <div role="button" tabindex="0">Custom Button</div>
  <!-- tabindex="0" makes the div focusable via keyboard Tab -->

  <!-- aria-label: provides a text label for non-text elements -->
  <button aria-label="Close dialog">X</button>
  <!-- Screen reader announces "Close dialog button" not just "X button" -->

  <!-- aria-hidden: hides decorative elements from screen readers -->
  <span aria-hidden="true">★★★★☆</span>
  <span>4 out of 5 stars</span>

  <!-- aria-expanded: indicates whether a collapsible section is open -->
  <button aria-expanded="false" aria-controls="menu">
    Toggle Menu
  </button>
  <ul id="menu" hidden>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>

  <!-- aria-live: announces dynamic content changes to screen readers -->
  <!-- "polite": waits until the user is idle -->
  <!-- "assertive": interrupts immediately -->
  <div aria-live="polite" id="status"></div>
  <!-- When JavaScript updates #status, screen readers read the new text -->

</body>`

];
