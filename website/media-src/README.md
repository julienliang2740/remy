# Source media

Full-resolution originals: phone captures, product renders, and the raw
hand-tracking recording.

Nothing in this folder is served. The site loads the derivatives in
`public/media/`, which are the same frames resized, cropped to remove baked-in
mats, and re-encoded (WebP for stills, H.264 at a sane bitrate for the video).
That keeps the deployed site around 3 MB instead of 30 MB, and keeps Cloudflare
Pages from carrying 27 MB nobody requests.

Originals stay here so a derivative can always be regenerated at a different
size or crop.
