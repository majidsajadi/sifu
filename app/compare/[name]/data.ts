export const commits = {
  deletions: 520,
  additions: 1187,
  changes: 1707,
  files: 73,
  url: "https://github.com/facebook/react/compare/v18.2.0...v18.3.1",
  total: 12,
  commits: [
    {
      author: { url: "https://github.com/acdlite", name: "acdlite" },
      sha: "2cfb4741fdf2f9e3a843930d95ee6965fab44b8f",
      message:
        "Bump version from 18.2 to 18.3\n\nWe're going to use this branch to release a minor 18.3 release based off\nthe published 18.2 release revision. This will include some additional\nwarnings to assist in upgrading to React 19, but no behavior changes\ncompared to 18.2.\n\nI bumped the React version to 18.3 and all the other packages by a patch\nrevision (since we're not going to update anything in those).",
      date: "2024-04-15T16:41:23Z",
      url: "https://github.com/facebook/react/commit/2cfb4741fdf2f9e3a843930d95ee6965fab44b8f",
    },
    {
      author: { url: "https://github.com/eps1lon", name: "eps1lon" },
      sha: "c2a246e956a164c7a92a3807c973bf9b56f85a6b",
      message:
        "Turn on string ref deprecation warning for everybody (not codemoddable) (#25383)\n\n## Summary\r\n \r\nAlternate to https://github.com/facebook/react/pull/25334 without any\r\nprod runtime changes i.e. the proposed codemod in\r\nhttps://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md#deprecate-string-refs-and-remove-production-mode-_owner-field\r\nwould not work.\r\n\r\n## How did you test this change?\r\n\r\n- [x] CI\r\n- [x] `yarn test` with and without `warnAboutStringRefs`",
      date: "2022-11-17T00:15:57Z",
      url: "https://github.com/facebook/react/commit/c2a246e956a164c7a92a3807c973bf9b56f85a6b",
    },
    {
      author: { url: "https://github.com/sebmarkbage", name: "sebmarkbage" },
      sha: "73bfaa16e1487d6c4a83ca960a6f0365af2ab440",
      message:
        'Turn on key spread warning in jsx-runtime for everyone (#25697)\n\nThis improves the error message a bit and ensures that we recommend\r\nputting the key first, not last, which ensures that the faster\r\n`jsx-runtime` is used.\r\n\r\nThis only affects the modern "automatic" JSX transform.',
      date: "2022-11-16T23:57:50Z",
      url: "https://github.com/facebook/react/commit/73bfaa16e1487d6c4a83ca960a6f0365af2ab440",
    },
    {
      author: { url: "https://github.com/sebmarkbage", name: "sebmarkbage" },
      sha: "589423270e8d69fce914f12f7dc7bb61bb7b81de",
      message:
        "Enable warning for defaultProps on function components for everyone (#25699)\n\nThis also fixes a gap where were weren't warning on memo components.",
      date: "2022-11-17T17:22:23Z",
      url: "https://github.com/facebook/react/commit/589423270e8d69fce914f12f7dc7bb61bb7b81de",
    },
    {
      author: { url: "https://github.com/acdlite", name: "acdlite" },
      sha: "415ee0e6ea0fe3e288e65868df2e3241143d5f7f",
      message:
        "Backport legacy context deprecation warning\n\nThis backports a deprecation warning for legacy context, even when\nStrict Mode is not enabled.\n\nI didn't bother to update all the tests because the tests are in such\na different state than what's on `main`, and on `main` we already\nupdated the tests accordingly. So instead I silenced the warnings in\nour test config, like we've done for other warnings in the past.",
      date: "2024-04-18T15:56:30Z",
      url: "https://github.com/facebook/react/commit/415ee0e6ea0fe3e288e65868df2e3241143d5f7f",
    },
    {
      author: { url: "https://github.com/gnoff", name: "gnoff" },
      sha: "7548c019ce44e41301555aac645fbdfcf180e9b9",
      message:
        "Deprecate `renderToStaticNodeStream` (#28872) (#28874)\n\nThis commit adds warnings indicating that `renderToStaticNodeStream`\r\nwill be removed in an upcoming React release. This API has been legacy,\r\nis not widely used (renderToStaticMarkup is more common) and has\r\nsemantically eqiuvalent implementations with renderToReadableStream and\r\nrenderToPipeableStream.\r\n\r\nlanded in main in #28872 \r\nchanged the warning to match renderToNodeStream",
      date: "2024-04-19T15:18:14Z",
      url: "https://github.com/facebook/react/commit/7548c019ce44e41301555aac645fbdfcf180e9b9",
    },
    {
      author: { url: "https://github.com/acdlite", name: "acdlite" },
      sha: "9090712fd3ca4e1099e1f92e67933c2cb4f32552",
      message:
        "Support writing to this.refs from userspace\n\nPreviously, the `refs` property of a class component instance was\nread-only by user code — only React could write to it, and until/unless\na string ref was used, it pointed to a shared empty object that was\nfrozen in dev to prevent userspace mutations.\n\nBecause string refs are deprecated, we want users to be able to codemod\nall their string refs to callback refs. The safest way to do this is to\noutput a callback ref that assigns to `this.refs`.\n\nSo to support this, we need to make `this.refs` writable by userspace.",
      date: "2024-04-18T17:37:54Z",
      url: "https://github.com/facebook/react/commit/9090712fd3ca4e1099e1f92e67933c2cb4f32552",
    },
    {
      author: { url: "https://github.com/acdlite", name: "acdlite" },
      sha: "d4ea75dc4258095593b6ac764289f42bddeb835c",
      message:
        "ReactDOMTestUtils deprecation warnings\n\nAdds a deprecation warning to ReactDOMTestUtils.renderIntoDocument,\nwhich is removed in version 19.\n\nAlso backports the deprecation warning for ReactDOMTestUtils.act.",
      date: "2024-04-23T19:01:25Z",
      url: "https://github.com/facebook/react/commit/d4ea75dc4258095593b6ac764289f42bddeb835c",
    },
    {
      author: { url: "https://github.com/acdlite", name: "acdlite" },
      sha: "c3b283964108b0e8dbcf1f9eb2e7e67815e39dfb",
      message:
        "Add deprecation warning for findDOMNode\n\nThis is removed in version 19. We already warned inside of Strict Mode\nbut this adds the warning everywhere.",
      date: "2024-04-23T20:15:13Z",
      url: "https://github.com/facebook/react/commit/c3b283964108b0e8dbcf1f9eb2e7e67815e39dfb",
    },
    {
      author: { url: "https://github.com/acdlite", name: "acdlite" },
      sha: "8a015b68cc060079878e426610e64e86fb328f8d",
      message:
        "Add deprecation warning for unmountComponentAtNode\n\nThis should have been deprecated in 18.0 alongside the other legacy\nDOM APIs like render().",
      date: "2024-04-23T20:28:14Z",
      url: "https://github.com/facebook/react/commit/8a015b68cc060079878e426610e64e86fb328f8d",
    },
    {
      author: { url: "https://github.com/acdlite", name: "acdlite" },
      sha: "d6c42f7b1134c4f033296ce4d47a7803aa0929df",
      message: "Bump to 18.3.1",
      date: "2024-04-26T15:34:44Z",
      url: "https://github.com/facebook/react/commit/d6c42f7b1134c4f033296ce4d47a7803aa0929df",
    },
    {
      author: { url: "https://github.com/rickhanlonii", name: "rickhanlonii" },
      sha: "f1338f8080abd1386454a10bbf93d67bfe37ce85",
      message: "Export `React.act` from 18.3",
      date: "2024-04-25T22:50:50Z",
      url: "https://github.com/facebook/react/commit/f1338f8080abd1386454a10bbf93d67bfe37ce85",
    },
  ],
};

export const changelog = {
  href: "https://github.com/facebook/react/blob/main//CHANGELOG.md",
  entries: [
    {
      version: "18.3.1",
      content:
        "\n- Export `act` from `react` [f1338f](https://github.com/facebook/react/commit/f1338f8080abd1386454a10bbf93d67bfe37ce85)\n",
    },
    {
      version: "18.3.0",
      content:
        "\nThis release is identical to 18.2 but adds warnings for deprecated APIs and other changes that are needed for React 19.\n\nRead the [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide) for more info.\n\n### React\n\n- Allow writing to `this.refs` to support string ref codemod [909071](https://github.com/facebook/react/commit/9090712fd3ca4e1099e1f92e67933c2cb4f32552)\n- Warn for deprecated `findDOMNode` outside StrictMode [c3b283](https://github.com/facebook/react/commit/c3b283964108b0e8dbcf1f9eb2e7e67815e39dfb)\n- Warn for deprecated `test-utils` methods [d4ea75](https://github.com/facebook/react/commit/d4ea75dc4258095593b6ac764289f42bddeb835c)\n- Warn for deprecated Legacy Context outside StrictMode [415ee0](https://github.com/facebook/react/commit/415ee0e6ea0fe3e288e65868df2e3241143d5f7f)\n- Warn for deprecated string refs outside StrictMode [#25383](https://github.com/facebook/react/pull/25383)\n- Warn for deprecated `defaultProps` for function components [#25699](https://github.com/facebook/react/pull/25699)\n- Warn when spreading `key` [#25697](https://github.com/facebook/react/pull/25697)\n- Warn when using `act` from `test-utils` [d4ea75](https://github.com/facebook/react/commit/d4ea75dc4258095593b6ac764289f42bddeb835c)\n\n### React DOM\n- Warn for deprecated `unmountComponentAtNode` [8a015b](https://github.com/facebook/react/commit/8a015b68cc060079878e426610e64e86fb328f8d)\n- Warn for deprecated `renderToStaticNodeStream` [#28874](https://github.com/facebook/react/pull/28874)\n",
    },
    {
      version: "18.2.0",
      content:
        "\n### React DOM\n\n* Provide a component stack as a second argument to `onRecoverableError`. ([@gnoff](https://github.com/gnoff) in [#24591](https://github.com/facebook/react/pull/24591))\n* Fix hydrating into `document` causing a blank page on mismatch. ([@gnoff](https://github.com/gnoff) in [#24523](https://github.com/facebook/react/pull/24523))\n* Fix false positive hydration errors with Suspense. ([@gnoff](https://github.com/gnoff) in [#24480](https://github.com/facebook/react/pull/24480) and  [@acdlite](https://github.com/acdlite) in [#24532](https://github.com/facebook/react/pull/24532))\n* Fix ignored `setState` in Safari when adding an iframe. ([@gaearon](https://github.com/gaearon) in [#24459](https://github.com/facebook/react/pull/24459))\n\n### React DOM Server\n\n* Pass information about server errors to the client. ([@salazarm](https://github.com/salazarm) and [@gnoff](https://github.com/gnoff) in [#24551](https://github.com/facebook/react/pull/24551) and [#24591](https://github.com/facebook/react/pull/24591))\n* Allow to provide a reason when aborting the HTML stream. ([@gnoff](https://github.com/gnoff) in [#24680](https://github.com/facebook/react/pull/24680))\n* Eliminate extraneous text separators in the HTML where possible. ([@gnoff](https://github.com/gnoff) in [#24630](https://github.com/facebook/react/pull/24630))\n* Disallow complex children inside `<title>` elements to match the browser constraints. ([@gnoff](https://github.com/gnoff) in [#24679](https://github.com/facebook/react/pull/24679))\n* Fix buffering in some worker environments by explicitly setting `highWaterMark` to `0`. ([@jplhomer](https://github.com/jplhomer) in [#24641](https://github.com/facebook/react/pull/24641))\n\n### Server Components (Experimental)\n\n* Add support for `useId()` inside Server Components. ([@gnoff](https://github.com/gnoff) in [#24172](https://github.com/facebook/react/pull/24172))\n",
    },
  ],
};
