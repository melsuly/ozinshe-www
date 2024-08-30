# Ozinshe UI

```sh
docker build . -t "ozinshe-ui"
```

Disable authorization

```sh
docker run -p 3000:3000 -e VITE_FEATURE_AUTH=false ozinshe-ui
```
