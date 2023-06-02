# Railway 中級編 Todo アプリをアップデートしよう

## 初期設定

### 必要なツール

1. Node.js v16 以降
2. Yarn v1

この Railway に取り組む方はすでにインストールできていると思いますがされていない方はインストールしてください。  
初期設定は原則 HTML/CSS/JavaScript Railway, React.js Railway と同様となります。

#### railway-todo-app リポジトリの Fork

画面右上にある Fork より[railway-todo-app](https://github.com/TechBowl-japan/railway-todo-app)のリポジトリを自分のアカウントに Fork してください。

#### railway-todo-app リポジトリの Clone

作成したリポジトリを作業するディレクトリにクローンしましょう。

- Mac なら Terminal.app(iTerm2 などでも良い)
- Windows なら PowerShell(GitBash などのインストールしたアプリでもう良いです。アプリによってはコマンドが異なることがあります)  
  で作業するディレクトリを開き、次のコマンドで Fork した React.js 　 Railway のリポジトリをローカルにクローンしてください。

```powershell
git clone https://github.com/{GitHubのユーザー名}/railway-todo-app.git
```

SSH でクローンを行う場合には、次のようになります

```powershell
git clone git@github.com:[GitHubのユーザー名]/railway-todo-app.git
```

#### .env ファイルの設定

クローンしたリポジトリには.env.sample というファイルがあります。それをコピーしたものを.env にファイル名を変更してください。  
フォークして最初の状態では API の URL を.env ファイルから読み込むようになっています。それを自身の.env に追記してください。

- API URL: https://railway-react-todo-backend.herokuapp.com

#### パッケージのインストール

クローンしたばかりのリポジトリは歯抜けの状態なので、必要なファイルをダウンロードする必要があります。 10 分程度掛かることもあるため、気長に待ちましょう。上から順番に **１つずつ** コマンドを実行しましょう：

```powershell
cd railway-todo-app

yarn install
```

#### ローカルサーバの起動

以下コマンドを実行します。

```powershell
yarn start
```
