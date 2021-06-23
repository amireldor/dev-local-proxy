# dev-local-proxy

A localhost development proxy for serving your web app and backend under the
same URL. Useful for fixing CORS issues while developing your stuff.

WebSockets support: ✔

**Note**: This is just something I hacked in the middle of the night so it can
be considered an "alpha" version. It seems to be working with my current game
project with serving 2 frontends and 1 backend on my machine through the same
`localhost:3000`.

Inspiration that didn't work well for me: https://github.com/FND/dprox

## Development

I think you should run `yarn dev`, then execute with `yarn node dist/index.js`. I'll try to pack it for normal npm install and usage, hopefully soon. I'm using yarn zero-installs for some reason. Wanted to give it a shot.
