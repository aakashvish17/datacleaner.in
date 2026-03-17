window.SiteData = (() => {
  const tools = [
    {
        "slug": "base64-encoder-decoder",
        "name": "Base64 Encoder / Decoder",
        "category": "Developer Tools",
        "description": "Encode plain text to Base64 or decode Base64 strings back into readable content.",
        "icon": "B6",
        "popular": false,
        "published": true,
        "keywords": [
            "base64",
            "encode",
            "decode"
        ],
        "faqs": [
            {
                "q": "Does it support Unicode text?",
                "a": "Yes. The encoder and decoder use UTF-8 safe conversion for standard text input."
            },
            {
                "q": "Can I switch between encode and decode modes?",
                "a": "Yes. The tool includes mode controls for both directions."
            }
        ],
        "optionsMarkup": "<label><span class=\"meta-note\">Mode</span><select data-option=\"mode\"><option value=\"encode\">Encode</option><option value=\"decode\">Decode</option></select></label>",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "case-converter",
        "name": "Case Converter",
        "category": "Text Tools",
        "description": "Switch text between uppercase, lowercase, title case, and sentence case for editing workflows.",
        "icon": "CC",
        "popular": false,
        "published": true,
        "keywords": [
            "case",
            "title",
            "sentence",
            "uppercase"
        ],
        "faqs": [
            {
                "q": "Does title case preserve short words?",
                "a": "This version capitalizes each word for speed and consistency."
            },
            {
                "q": "Can I convert paragraph text?",
                "a": "Yes. The tool works with single words, sentences, and multi-paragraph content."
            }
        ],
        "optionsMarkup": "<label><span class=\"meta-note\">Case style</span><select data-option=\"mode\"><option value=\"upper\">UPPERCASE</option><option value=\"lower\">lowercase</option><option value=\"title\">Title Case</option><option value=\"sentence\">Sentence Case</option></select></label>",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "code-beautifier",
        "name": "Code Beautifier",
        "category": "Developer Tools",
        "description": "Format HTML, CSS, JavaScript, JSON, and XML snippets into cleaner readable blocks.",
        "icon": "CB",
        "popular": false,
        "published": true,
        "keywords": [
            "beautify",
            "code",
            "format"
        ],
        "faqs": [
            {
                "q": "What languages are supported?",
                "a": "This release supports common text-based formats including JSON, HTML, CSS, JavaScript, and XML."
            },
            {
                "q": "How is formatting chosen?",
                "a": "A simple mode selector applies the right formatting strategy for the selected language."
            }
        ],
        "optionsMarkup": "<label><span class=\"meta-note\">Format type</span><select data-option=\"mode\"><option value=\"json\">JSON</option><option value=\"html\">HTML</option><option value=\"css\">CSS</option><option value=\"js\">JavaScript</option><option value=\"xml\">XML</option></select></label>",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "column-extractor",
        "name": "Column Extractor",
        "category": "Data Tools",
        "description": "Extract a specific comma-separated or delimiter-based column from mixed row data.",
        "icon": "CE",
        "popular": false,
        "published": true,
        "keywords": [
            "column",
            "extract",
            "csv",
            "list"
        ],
        "faqs": [
            {
                "q": "Can I change the delimiter?",
                "a": "Yes. The tool supports commas, tabs, pipes, or any custom separator."
            },
            {
                "q": "How do I select a column?",
                "a": "Enter a column index starting from 1 to extract the matching field from each row."
            }
        ],
        "optionsMarkup": "<label><span class=\"meta-note\">Column</span><input type=\"number\" min=\"1\" value=\"1\" data-option=\"column\" /></label><label><span class=\"meta-note\">Delimiter</span><input type=\"text\" value=\",\" data-option=\"delimiter\" /></label>",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "css-minifier",
        "name": "CSS Minifier",
        "category": "Developer Tools",
        "description": "Minify CSS by collapsing whitespace and comments for leaner stylesheets.",
        "icon": "CM",
        "popular": false,
        "published": true,
        "keywords": [
            "css",
            "minify"
        ],
        "faqs": [
            {
                "q": "Can I paste full stylesheets?",
                "a": "Yes. The minifier handles large CSS blocks in the browser."
            },
            {
                "q": "Does it preserve CSS rules?",
                "a": "It removes unnecessary whitespace and comments while keeping selectors and declarations."
            }
        ],
        "optionsMarkup": "",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "csv-to-json",
        "name": "CSV to JSON Converter",
        "category": "Data Tools",
        "description": "Convert CSV rows into structured JSON with instant parsing, copy support, and file export.",
        "icon": "CJ",
        "popular": true,
        "published": true,
        "keywords": [
            "csv",
            "json",
            "convert",
            "developer",
            "data"
        ],
        "faqs": [
            {
                "q": "Is CSV data uploaded to a server?",
                "a": "No. Conversion runs in the browser so the data remains on the device unless the site owner customizes deployment."
            },
            {
                "q": "Can I export the converted JSON?",
                "a": "Yes. You can copy the output or download it as a JSON file directly from the tool page."
            }
        ],
        "optionsMarkup": "",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "email-list-cleaner",
        "name": "Email List Cleaner",
        "category": "SEO Tools",
        "description": "Clean email lists by removing duplicates, validating format, and sorting addresses alphabetically.",
        "icon": "EL",
        "popular": false,
        "published": true,
        "keywords": [
            "email",
            "validate",
            "marketing",
            "list"
        ],
        "faqs": [
            {
                "q": "Does it verify mailbox existence?",
                "a": "No. It validates syntax and cleans duplicates locally without checking remote mail servers."
            },
            {
                "q": "Can I sort the final list?",
                "a": "Yes. Sorted output is available after filtering invalid or repeated addresses."
            }
        ],
        "optionsMarkup": "<label><span class=\"meta-note\">Sort output</span><select data-option=\"sort\"><option value=\"yes\">Yes</option><option value=\"no\">No</option></select></label>",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "html-minifier",
        "name": "HTML Minifier",
        "category": "Developer Tools",
        "description": "Trim extra whitespace and comments from HTML markup to reduce payload size.",
        "icon": "HM",
        "popular": false,
        "published": true,
        "keywords": [
            "html",
            "minify",
            "code"
        ],
        "faqs": [
            {
                "q": "Will it remove HTML comments?",
                "a": "Yes. Standard HTML comments are stripped while preserving markup content."
            },
            {
                "q": "Should I review output before production?",
                "a": "Yes. Minified output is best reviewed quickly before deployment, especially for edge cases."
            }
        ],
        "optionsMarkup": "",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "js-minifier",
        "name": "JS Minifier",
        "category": "Developer Tools",
        "description": "Compress JavaScript by trimming comments and excess whitespace for lighter snippets.",
        "icon": "JM",
        "popular": false,
        "published": true,
        "keywords": [
            "javascript",
            "minify"
        ],
        "faqs": [
            {
                "q": "Is this a full production minifier?",
                "a": "It is a lightweight client-side cleaner best for snippets and quick reductions rather than advanced bundling."
            },
            {
                "q": "Should I verify the result?",
                "a": "Yes. Review any minified script before shipping, especially if it contains strings or regex-heavy code."
            }
        ],
        "optionsMarkup": "",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "json-formatter",
        "name": "JSON Formatter & Validator",
        "category": "Data Tools",
        "description": "Pretty-print, minify, and validate JSON with clear error handling for malformed payloads.",
        "icon": "JF",
        "popular": true,
        "published": true,
        "keywords": [
            "json",
            "formatter",
            "validator"
        ],
        "faqs": [
            {
                "q": "Does the validator show invalid JSON errors?",
                "a": "Yes. The tool surfaces parsing errors so users can locate malformed braces, commas, or quotes."
            },
            {
                "q": "Can I minify JSON for production use?",
                "a": "Yes. Use the Minify mode to strip whitespace while keeping the JSON structure intact."
            }
        ],
        "optionsMarkup": "<label><span class=\"meta-note\">Mode</span><select data-option=\"mode\"><option value=\"pretty\">Pretty</option><option value=\"minify\">Minify</option><option value=\"validate\">Validate</option></select></label>",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "json-to-csv",
        "name": "JSON to CSV Converter",
        "category": "Data Tools",
        "description": "Convert JSON arrays into CSV rows for spreadsheets, imports, and reporting pipelines.",
        "icon": "JC",
        "popular": false,
        "published": true,
        "keywords": [
            "json",
            "csv",
            "spreadsheet"
        ],
        "faqs": [
            {
                "q": "What JSON format is supported?",
                "a": "The tool expects an array of objects so it can generate a header row and consistent fields."
            },
            {
                "q": "Can I download the generated CSV?",
                "a": "Yes. CSV output can be copied or exported as a file."
            }
        ],
        "optionsMarkup": "",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "keyword-density-checker",
        "name": "Keyword Density Checker",
        "category": "SEO Tools",
        "description": "Measure keyword frequency and top terms in content to support on-page SEO reviews.",
        "icon": "KD",
        "popular": false,
        "published": true,
        "keywords": [
            "keyword",
            "density",
            "seo",
            "content"
        ],
        "faqs": [
            {
                "q": "How is density calculated?",
                "a": "Density is shown as the percentage of occurrences compared with the total word count."
            },
            {
                "q": "Can I analyze any word or phrase?",
                "a": "Yes. Enter a target keyword or phrase and the tool reports occurrences and density."
            }
        ],
        "optionsMarkup": "<label><span class=\"meta-note\">Target keyword</span><input type=\"text\" placeholder=\"data cleaning\" data-option=\"keyword\" /></label>",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "large-text-processor",
        "name": "Large Text Word Processor",
        "category": "Text Tools",
        "description": "Analyze and clean large text blocks with word counts, character counts, and duplicate-line removal.",
        "icon": "LT",
        "popular": false,
        "published": true,
        "keywords": [
            "word count",
            "text stats",
            "blank lines"
        ],
        "faqs": [
            {
                "q": "Does it show word and character counts?",
                "a": "Yes. Metrics update when the text is processed."
            },
            {
                "q": "Can I remove blank or duplicate lines?",
                "a": "Yes. The processor includes switches for both cleanup tasks."
            }
        ],
        "optionsMarkup": "<label><span class=\"meta-note\">Remove duplicate lines</span><select data-option=\"dedupe\"><option value=\"yes\">Yes</option><option value=\"no\">No</option></select></label><label><span class=\"meta-note\">Remove blank lines</span><select data-option=\"blank\"><option value=\"yes\">Yes</option><option value=\"no\">No</option></select></label>",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "list-deduplicator",
        "name": "List De-duplicator",
        "category": "Text Tools",
        "description": "Remove duplicate entries from line-based lists, sort them, and optionally preserve the original order.",
        "icon": "LD",
        "popular": true,
        "published": true,
        "keywords": [
            "list",
            "duplicate",
            "sort",
            "text"
        ],
        "faqs": [
            {
                "q": "Can I keep the original list order?",
                "a": "Yes. A keep-order option preserves the first occurrence of each unique line."
            },
            {
                "q": "Will blank lines be removed?",
                "a": "Blank lines are ignored by default during de-duplication to keep results clean."
            }
        ],
        "optionsMarkup": "<label><span class=\"meta-note\">Keep order</span><select data-option=\"keepOrder\"><option value=\"yes\">Yes</option><option value=\"no\">No, sort</option></select></label>",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "regex-tester",
        "name": "Regex Tester",
        "category": "Developer Tools",
        "description": "Test regular expressions against sample text with live match extraction and flag support.",
        "icon": "RX",
        "popular": false,
        "published": true,
        "keywords": [
            "regex",
            "tester",
            "developer"
        ],
        "faqs": [
            {
                "q": "Which regex flags are supported?",
                "a": "Use standard JavaScript flags like g, i, and m to control matching behavior."
            },
            {
                "q": "Can I see all matches?",
                "a": "Yes. The output lists every matched value found in the sample text."
            }
        ],
        "optionsMarkup": "<label><span class=\"meta-note\">Pattern</span><input type=\"text\" value=\"\\w+\" data-option=\"pattern\" /></label><label><span class=\"meta-note\">Flags</span><input type=\"text\" value=\"g\" data-option=\"flags\" /></label>",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "slug-generator",
        "name": "Slug Generator",
        "category": "SEO Tools",
        "description": "Create clean, lowercase, hyphenated slugs for articles, product pages, and landing pages.",
        "icon": "SG",
        "popular": false,
        "published": true,
        "keywords": [
            "slug",
            "seo",
            "url"
        ],
        "faqs": [
            {
                "q": "Does it remove special characters?",
                "a": "Yes. The generator strips punctuation, trims spacing, and replaces gaps with hyphens."
            },
            {
                "q": "Can I use it for blog URLs?",
                "a": "Yes. It is ideal for SEO-friendly article, category, and landing page slugs."
            }
        ],
        "optionsMarkup": "",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "text-cleaner",
        "name": "Text Cleaner",
        "category": "Text Tools",
        "description": "Remove extra spaces, line breaks, HTML tags, and special characters from large text blocks.",
        "icon": "TC",
        "popular": true,
        "published": true,
        "keywords": [
            "text",
            "cleaner",
            "spaces",
            "html"
        ],
        "faqs": [
            {
                "q": "What kind of cleanup can I apply?",
                "a": "You can trim repeated spaces, normalize line breaks, strip HTML tags, and remove non-alphanumeric characters."
            },
            {
                "q": "Is the output safe to copy into CMS tools?",
                "a": "Yes. The cleaner is useful for preparing content for editors, reports, or no-code tools."
            }
        ],
        "optionsMarkup": "<label><span class=\"meta-note\">Line breaks</span><select data-option=\"whitespace\"><option value=\"normalize\">Normalize</option><option value=\"remove-lines\">Remove</option></select></label><label><span class=\"meta-note\">Strip HTML</span><select data-option=\"stripHtml\"><option value=\"yes\">Yes</option><option value=\"no\">No</option></select></label><label><span class=\"meta-note\">Special chars</span><select data-option=\"specialChars\"><option value=\"no\">Keep</option><option value=\"yes\">Remove</option></select></label>",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "text-diff-checker",
        "name": "Text Diff Checker",
        "category": "Text Tools",
        "description": "Compare two text blocks and highlight lines that were added, removed, or changed.",
        "icon": "TD",
        "popular": false,
        "published": true,
        "keywords": [
            "diff",
            "compare",
            "text"
        ],
        "faqs": [
            {
                "q": "Does it compare line by line?",
                "a": "Yes. This release uses a straightforward line comparison view to show differences quickly."
            },
            {
                "q": "Is it good for version review?",
                "a": "It works well for quick drafts, copy revisions, and lightweight content comparisons."
            }
        ],
        "optionsMarkup": "<label><span class=\"meta-note\">Comparison mode</span><select data-option=\"mode\"><option value=\"line\">Line by line</option></select></label>",
        "handlerCode": "",
        "secondaryInput": true,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "url-cleaner",
        "name": "URL Cleaner",
        "category": "SEO Tools",
        "description": "Remove tracking parameters such as utm_source, ref, and fbclid from URLs instantly.",
        "icon": "UC",
        "popular": true,
        "published": true,
        "keywords": [
            "url",
            "tracking",
            "utm",
            "seo"
        ],
        "faqs": [
            {
                "q": "Which parameters are removed?",
                "a": "The default profile removes common analytics and referral parameters including UTM tags, ref, and fbclid."
            },
            {
                "q": "Can I add custom parameters?",
                "a": "Yes. You can provide a comma-separated list of extra query parameters to strip."
            }
        ],
        "optionsMarkup": "<label><span class=\"meta-note\">Extra params</span><input type=\"text\" placeholder=\"gclid,mc_cid\" data-option=\"params\" /></label>",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "url-encoder-decoder",
        "name": "URL Encoder / Decoder",
        "category": "Developer Tools",
        "description": "Safely encode query strings or decode encoded URLs for debugging and form handling.",
        "icon": "UE",
        "popular": false,
        "published": true,
        "keywords": [
            "url encode",
            "decode",
            "query string"
        ],
        "faqs": [
            {
                "q": "What is this tool useful for?",
                "a": "It helps developers and marketers prepare URLs for links, API requests, and encoded query values."
            },
            {
                "q": "Can I decode percent-encoded strings?",
                "a": "Yes. The decoder reverses standard URL encoding."
            }
        ],
        "optionsMarkup": "<label><span class=\"meta-note\">Mode</span><select data-option=\"mode\"><option value=\"encode\">Encode</option><option value=\"decode\">Decode</option></select></label>",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    },
    {
        "slug": "xml-formatter",
        "name": "XML Formatter",
        "category": "Developer Tools",
        "description": "Indent XML markup for readability and clean debugging without sending content to a server.",
        "icon": "XF",
        "popular": false,
        "published": true,
        "keywords": [
            "xml",
            "formatter"
        ],
        "faqs": [
            {
                "q": "Is malformed XML detected?",
                "a": "The formatter catches common parsing issues and reports when markup cannot be processed cleanly."
            },
            {
                "q": "Can I minify XML too?",
                "a": "This release focuses on readable formatting. You can copy the cleaned output after indentation."
            }
        ],
        "optionsMarkup": "",
        "handlerCode": "",
        "secondaryInput": false,
        "secondaryInputLabel": "Second text block"
    }
];

  const articles = [
    {
        "slug": "url-cleaner-for-utm-parameters-and-seo-audits",
        "title": "URL Cleaner for UTM Parameters and SEO Audits: Simplify Tracked Links Before Reporting",
        "category": "SEO Tools",
        "description": "A practical guide to cleaning tracked URLs for audits, reports, and exports without removing parameters that still matter.",
        "date": "2026-03-17",
        "readTime": "14 min read",
        "published": true,
        "featuredImage": "/assets/images/articles/url-cleaner-for-utm-parameters-and-seo-audits.svg",
        "featuredImageAlt": "Tracked URLs being cleaned into simpler destination links for SEO and reporting"
    },
    {
        "slug": "csv-to-json-converter-for-product-imports",
        "title": "CSV to JSON Converter for Product Imports: Clean Spreadsheet Exports Before Bulk Uploads",
        "category": "Data Processing",
        "description": "A practical guide to converting CSV product sheets into clean JSON for imports, with advice on field mapping, URL hygiene, and validation.",
        "date": "2026-03-17",
        "readTime": "13 min read",
        "published": true,
        "featuredImage": "/assets/images/articles/csv-to-json-converter-for-product-imports.svg",
        "featuredImageAlt": "Spreadsheet rows transforming into structured JSON objects for product imports"
    },
    {
        "slug": "json-formatter-for-api-testing",
        "title": "JSON Formatter for API Testing: How I Validate Payloads Before They Break a Workflow",
        "category": "Developer Tools",
        "description": "A practical, experience-led guide to using a JSON formatter to validate API payloads, catch mistakes early, and keep testing workflows stable.",
        "date": "2026-03-17",
        "readTime": "14 min read",
        "published": true,
        "featuredImage": "/assets/images/articles/json-formatter-for-api-testing.svg",
        "featuredImageAlt": "JSON validation interface with payload structure, checks, and API request cards"
    }
];

  const getToolBySlug = (slug) => tools.find((tool) => tool.slug === slug);
  const getArticleBySlug = (slug) => articles.find((article) => article.slug === slug);

  return { tools, articles, getToolBySlug, getArticleBySlug };
})();
