## Next.js×Firestore で重複検知を持った事前登録フォームを作ってみた

Zenn に公開している以下の記事の実装例です。  
簡略化のため記事内では実装していなかった各要素の style、非同期処理のローディング処理を加えたものになります。  
👇  
https://zenn.dev/otacle/articles/cab0291a64ddd6

### ローカル環境セットアップ

1. Next.js セットアップ＆起動

```
cp .env.example .env.local
yarn
yarn dev
```

2. Firebase の初期化に必要な`apiKey`等を`.env.local`に設定してください
