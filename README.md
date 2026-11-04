# colorful-notes-dsh

多彩便签 —— DeepSeek Harness 侧边栏的彩色便签板，支持每天、每周、每月和单次提醒。

Colorful sticky notes for the DeepSeek Harness sidebar, with daily, weekly, monthly and one-time reminders.

## 功能

- 侧边栏「多彩便签」入口，点击打开中部便签页。
- 添加、编辑、批量删除便签；每条便签有标题、正文和 8 种颜色之一。
- 卡片显示标题、正文前 4 行和更新时间；点击卡片或铅笔图标可再次编辑。
- 删除需先勾选至少一条便签，删除按钮才会变为可用。
- **提醒**：每天、每周（可多选星期几）、每月（29/30/31 号遇短月顺延到当月最后一天）、单次（指定日期与时间）。
- 到点后侧边栏图标出现闪烁并震动的闹铃徽标；正在提醒的便签卡片按自身颜色霓虹呼吸。
- 提醒中的便签不在可视区域内时，页面底部按所有提醒便签的颜色显示多色霓虹光带，并提供「查看」与「全部停止」。
- 每条提醒中的便签都有「停止提醒」按钮；停止后该次提醒不再触发，下一次到点仍会提醒。
- 中英文界面；便签数据保存在当前浏览器的 localStorage。

## 安装

从 GitHub 安装：

```bash
dsh plugin --profile <你的 profile 名> add github:RockChen87/colorful-notes-dsh
```

安装后侧边栏会出现便签图标，点击即可打开「多彩便签」。

## 使用

1. 点击「添加便笺」，填写标题和内容并选择颜色。
2. 需要提醒时，在编辑对话框的「提醒」区域选择类型并设置时间。
3. 到达提醒时间后，侧边栏图标和便签页会给出提示；点便签上的「停止提醒」或底部「全部停止」结束本次提醒。

## 数据

便签保存在当前浏览器 localStorage 的 `dsh.colorful-notes.v1` 键下，不会上传服务器；清理站点数据或换浏览器会丢失。

## 开发

无需构建步骤：`client.js` 是浏览器端模块，由 `package.json` 的 `./client` 导出；`index.js` 是 Host 半，仅用于让 bundle 行生效。

## License

MIT
