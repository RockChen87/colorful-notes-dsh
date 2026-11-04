window.__ModuleLoader__.load({
  id: 'colorful-notes-dsh',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    /** Client locale namespace owned by this bundle. */
    const NS = 'colorful-notes';
    /** localStorage key holding the note list for this browser profile. */
    const STORAGE_KEY = 'dsh.colorful-notes.v1';
    /** Sidebar panel id; the keyed `main` slot renders the same id. */
    const PANEL_ID = 'colorful-notes';
    /** Reminder clock resolution. */
    const TICK_MS = 1000;
    /** A load this recent still counts as being present at the reminder node. */
    const LOAD_GRACE_MS = 2000;

    /** Note accents. The hue is mixed into theme surfaces, never used as text. */
    const PALETTE = [
      { id: 'amber', hex: '#E3A008' },
      { id: 'coral', hex: '#E05A4E' },
      { id: 'rose', hex: '#D4518C' },
      { id: 'violet', hex: '#8B6BE0' },
      { id: 'sky', hex: '#3D8BE0' },
      { id: 'teal', hex: '#2A9D96' },
      { id: 'green', hex: '#48A45C' },
      { id: 'lime', hex: '#8AAE2A' },
    ];

    const REMINDER_TYPES = ['none', 'daily', 'weekly', 'monthly', 'once'];
    const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

    const DICT = {
      zh: {
        'panel.title': '多彩便签',
        'count.total': '共 {count} 张便签',
        'count.selected': '已选 {count} 张',
        'action.add': '添加便笺',
        'action.delete': '删除',
        'action.cancel': '取消',
        'action.save': '保存',
        'action.view': '查看',
        'action.stop': '停止提醒',
        'action.stopAll': '全部停止',
        'delete.hint': '先勾选至少一张便签',
        'empty.title': '还没有便签',
        'empty.hint': '点击右上角的「添加便笺」，记录第一条想法。',
        'dialog.create': '添加便笺',
        'dialog.edit': '编辑便签',
        'field.title': '标题',
        'field.title.placeholder': '可选，例如：本周计划',
        'field.content': '内容',
        'field.content.placeholder': '写点什么…',
        'field.color': '颜色',
        'field.reminder': '提醒',
        'field.reminder.time': '时间',
        'field.reminder.weekdays': '星期',
        'field.reminder.monthDay': '每月几号',
        'field.reminder.date': '日期',
        'reminder.type.none': '不提醒',
        'reminder.type.daily': '每天',
        'reminder.type.weekly': '每周',
        'reminder.type.monthly': '每月',
        'reminder.type.once': '单次',
        'reminder.daily': '每天 {time}',
        'reminder.weekly': '每周{days} {time}',
        'reminder.monthly': '每月 {day} 日 {time}',
        'reminder.once': '{date} {time}',
        'reminder.error.time': '请选择提醒时间',
        'reminder.error.weekly': '至少选择一个星期',
        'reminder.error.onceDate': '请选择单次提醒的日期和时间',
        'reminder.error.oncePast': '单次提醒时间需要晚于当前时间',
        'reminder.ringing': '提醒中',
        'reminder.count': '{count} 个便签正在提醒',
        'weekday.1': '周一',
        'weekday.2': '周二',
        'weekday.3': '周三',
        'weekday.4': '周四',
        'weekday.5': '周五',
        'weekday.6': '周六',
        'weekday.7': '周日',
        'list.separator': '、',
        'note.untitled': '无标题',
        'note.select': '选择便签：{title}',
        'note.open': '编辑便签：{title}',
        'note.updated': '更新于 {time}',
        'color.amber': '琥珀',
        'color.coral': '珊瑚',
        'color.rose': '玫红',
        'color.violet': '紫罗兰',
        'color.sky': '天蓝',
        'color.teal': '青碧',
        'color.green': '草绿',
        'color.lime': '嫩绿',
      },
      en: {
        'panel.title': 'Colorful Notes',
        'count.total': '{count} notes',
        'count.selected': '{count} selected',
        'action.add': 'Add note',
        'action.delete': 'Delete',
        'action.cancel': 'Cancel',
        'action.save': 'Save',
        'action.view': 'View',
        'action.stop': 'Stop',
        'action.stopAll': 'Stop all',
        'delete.hint': 'Select at least one note first',
        'empty.title': 'No notes yet',
        'empty.hint': 'Use Add note in the top right to capture your first idea.',
        'dialog.create': 'Add note',
        'dialog.edit': 'Edit note',
        'field.title': 'Title',
        'field.title.placeholder': 'Optional, e.g. This week',
        'field.content': 'Content',
        'field.content.placeholder': 'Write something…',
        'field.color': 'Color',
        'field.reminder': 'Reminder',
        'field.reminder.time': 'Time',
        'field.reminder.weekdays': 'Weekdays',
        'field.reminder.monthDay': 'Day of month',
        'field.reminder.date': 'Date',
        'reminder.type.none': 'Off',
        'reminder.type.daily': 'Daily',
        'reminder.type.weekly': 'Weekly',
        'reminder.type.monthly': 'Monthly',
        'reminder.type.once': 'Once',
        'reminder.daily': 'Daily at {time}',
        'reminder.weekly': 'Weekly on {days} at {time}',
        'reminder.monthly': 'Monthly on day {day} at {time}',
        'reminder.once': '{date} at {time}',
        'reminder.error.time': 'Pick a reminder time',
        'reminder.error.weekly': 'Pick at least one weekday',
        'reminder.error.onceDate': 'Pick a date and time for the one-time reminder',
        'reminder.error.oncePast': 'The one-time reminder must be in the future',
        'reminder.ringing': 'Ringing',
        'reminder.count': '{count} notes are ringing',
        'weekday.1': 'Mon',
        'weekday.2': 'Tue',
        'weekday.3': 'Wed',
        'weekday.4': 'Thu',
        'weekday.5': 'Fri',
        'weekday.6': 'Sat',
        'weekday.7': 'Sun',
        'list.separator': ', ',
        'note.untitled': 'Untitled',
        'note.select': 'Select note: {title}',
        'note.open': 'Edit note: {title}',
        'note.updated': 'Updated {time}',
        'color.amber': 'Amber',
        'color.coral': 'Coral',
        'color.rose': 'Rose',
        'color.violet': 'Violet',
        'color.sky': 'Sky',
        'color.teal': 'Teal',
        'color.green': 'Green',
        'color.lime': 'Lime',
      },
    };

    const STYLE_TEXT = [
      '.cfn-page{position:relative;box-sizing:border-box;display:flex;flex-direction:column;height:100%;min-height:0;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary)}',
      '.cfn-page *,.cfn-page *::before,.cfn-page *::after{box-sizing:border-box}',
      '.cfn-header{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:16px 24px;padding:26px max(32px,calc((100% - 1080px) / 2)) 18px;border-bottom:1px solid var(--dsw-alias-border-l1)}',
      '.cfn-heading{display:flex;flex-direction:column;gap:6px;min-width:0}',
      '.cfn-title{margin:0;font-size:20px;font-weight:600;line-height:28px;color:var(--dsw-alias-label-primary)}',
      '.cfn-subtitle{font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary)}',
      '.cfn-actions{display:flex;align-items:center;gap:8px}',
      '.cfn-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:32px;padding:0 14px;border:1px solid transparent;border-radius:8px;font:inherit;font-size:13px;font-weight:500;line-height:1;white-space:nowrap;cursor:pointer;transition:background-color .15s ease,border-color .15s ease,opacity .15s ease}',
      '.cfn-btn svg{flex:none}',
      '.cfn-btn--primary{background:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-label-primary);color:var(--dsw-alias-bg-base)}',
      '.cfn-btn--primary:hover:not(:disabled){opacity:.9}',
      '.cfn-btn--ghost{background:var(--dsw-alias-bg-layer-1);border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary)}',
      '.cfn-btn--ghost:hover:not(:disabled){background:var(--dsw-alias-bg-layer-2)}',
      '.cfn-btn--sm{height:28px;padding:0 10px;font-size:12px;border-radius:7px}',
      '.cfn-btn:disabled{opacity:.4;cursor:not-allowed}',
      '.cfn-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}',
      '.cfn-scroll{flex:1 1 auto;min-height:0;overflow-y:auto;padding:22px max(32px,calc((100% - 1080px) / 2)) 56px}',
      '.cfn-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(216px,1fr));gap:14px}',
      '.cfn-card{position:relative;display:flex;flex-direction:column;gap:6px;min-height:140px;padding:12px 14px;border:1px solid var(--dsw-alias-border-l1);border-color:color-mix(in srgb,var(--cfn-accent) 30%,var(--dsw-alias-border-l1));border-radius:12px;background-color:var(--dsw-alias-bg-layer-1);background-image:linear-gradient(180deg,color-mix(in srgb,var(--cfn-accent) 20%,transparent),transparent 72px);box-shadow:inset 0 3px 0 0 var(--cfn-accent);cursor:pointer;transition:border-color .16s ease,background-color .16s ease,box-shadow .16s ease}',
      '.cfn-card:hover{border-color:color-mix(in srgb,var(--cfn-accent) 55%,var(--dsw-alias-border-l1));background-color:var(--dsw-alias-bg-layer-2)}',
      '.cfn-card--selected{border-color:var(--dsw-alias-brand-primary);box-shadow:inset 0 3px 0 0 var(--cfn-accent),0 0 0 2px color-mix(in srgb,var(--dsw-alias-brand-primary) 45%,transparent)}',
      '.cfn-card--ringing{animation:cfn-neon 1.8s ease-in-out infinite}',
      '@keyframes cfn-neon{0%,100%{border-color:color-mix(in srgb,var(--cfn-accent) 65%,var(--dsw-alias-border-l1));box-shadow:inset 0 3px 0 0 var(--cfn-accent),0 0 0 1px color-mix(in srgb,var(--cfn-accent) 45%,transparent),0 0 12px 0 color-mix(in srgb,var(--cfn-accent) 35%,transparent)}50%{border-color:var(--cfn-accent);box-shadow:inset 0 3px 0 0 var(--cfn-accent),0 0 0 2px color-mix(in srgb,var(--cfn-accent) 80%,transparent),0 0 28px 6px color-mix(in srgb,var(--cfn-accent) 55%,transparent)}}',
      '.cfn-card-top{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:22px}',
      '.cfn-check{position:relative;display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;flex:none;cursor:pointer}',
      '.cfn-check-input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer;z-index:1}',
      '.cfn-check-box{display:flex;align-items:center;justify-content:center;width:16px;height:16px;border:1.5px solid var(--dsw-alias-border-l2);border-radius:4px;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-bg-base);transition:background-color .15s ease,border-color .15s ease}',
      '.cfn-check-input:checked+.cfn-check-box{background:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-label-primary)}',
      '.cfn-check-input:focus-visible+.cfn-check-box{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}',
      '.cfn-edit{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;border:none;border-radius:6px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;opacity:.55;transition:opacity .15s ease,background-color .15s ease}',
      '.cfn-card:hover .cfn-edit,.cfn-edit:focus-visible{opacity:1}',
      '.cfn-edit:hover{background:color-mix(in srgb,var(--cfn-accent) 18%,transparent);color:var(--dsw-alias-label-primary)}',
      '.cfn-edit:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}',
      '.cfn-ring{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:3px 4px 3px 8px;border-radius:8px;background:color-mix(in srgb,var(--cfn-accent) 24%,var(--dsw-alias-bg-layer-1))}',
      '.cfn-ring-label{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:600;line-height:16px;color:var(--dsw-alias-label-primary)}',
      '.cfn-ring-stop{flex:none;height:22px;padding:0 8px;border:1px solid color-mix(in srgb,var(--cfn-accent) 55%,var(--dsw-alias-border-l2));border-radius:6px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;font-size:11px;line-height:1;cursor:pointer}',
      '.cfn-ring-stop:hover{background:var(--dsw-alias-bg-layer-2)}',
      '.cfn-ring-stop:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}',
      '.cfn-card-title{font-size:14px;font-weight:600;line-height:20px;color:var(--dsw-alias-label-primary);overflow:hidden;white-space:nowrap;text-overflow:ellipsis}',
      '.cfn-card-body{margin:0;font-size:13px;line-height:20px;color:var(--dsw-alias-label-secondary);white-space:pre-wrap;overflow-wrap:anywhere;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:4;overflow:hidden}',
      '.cfn-card-reminder{display:flex;align-items:center;gap:5px;min-width:0;font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary)}',
      '.cfn-card-reminder span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}',
      '.cfn-card-meta{margin-top:auto;padding-top:6px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary);opacity:.75}',
      '.cfn-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;min-height:320px;padding:40px 24px;border:1px dashed var(--dsw-alias-border-l2);border-radius:14px;text-align:center}',
      '.cfn-empty-icon{color:var(--dsw-alias-label-secondary);opacity:.6}',
      '.cfn-empty-title{font-size:14px;font-weight:600;color:var(--dsw-alias-label-primary)}',
      '.cfn-empty-hint{max-width:320px;font-size:13px;line-height:20px;color:var(--dsw-alias-label-secondary)}',
      '.cfn-neonbar{position:relative;flex:none;border-top:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);overflow:hidden}',
      '.cfn-neonbar-glow{position:absolute;left:-10%;right:-10%;top:-16px;height:38px;background-image:var(--cfn-bar-gradient);filter:blur(14px);opacity:.5;animation:cfn-bar-pulse 1.8s ease-in-out infinite;pointer-events:none;z-index:0}',
      '.cfn-neonbar-line{position:absolute;left:0;right:0;top:0;height:2px;background-image:var(--cfn-bar-gradient);animation:cfn-bar-pulse 1.8s ease-in-out infinite;z-index:1}',
      '@keyframes cfn-bar-pulse{0%,100%{opacity:.35}50%{opacity:1}}',
      '.cfn-neonbar-content{position:relative;z-index:2;display:flex;align-items:center;gap:10px;padding:10px max(32px,calc((100% - 1080px) / 2))}',
      '.cfn-neonbar-text{display:inline-flex;align-items:center;gap:6px;margin-right:auto;font-size:12px;font-weight:600;line-height:18px;color:var(--dsw-alias-label-primary)}',
      '.cfn-overlay{position:fixed;inset:0;z-index:80;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(0,0,0,.45)}',
      '.cfn-dialog{display:flex;flex-direction:column;gap:14px;width:min(520px,100%);max-height:calc(100vh - 48px);overflow-y:auto;padding:20px 22px 18px;border:1px solid var(--dsw-alias-border-l1);border-radius:14px;background:var(--dsw-alias-bg-overlay);box-shadow:0 20px 60px rgba(0,0,0,.3)}',
      '.cfn-dialog-title{margin:0;font-size:16px;font-weight:600;line-height:24px;color:var(--dsw-alias-label-primary)}',
      '.cfn-field{display:flex;flex-direction:column;gap:6px}',
      '.cfn-field-label{font-size:12px;font-weight:500;line-height:18px;color:var(--dsw-alias-label-secondary)}',
      '.cfn-input,.cfn-textarea{width:100%;padding:8px 10px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;line-height:20px;outline:none;transition:border-color .15s ease,box-shadow .15s ease}',
      '.cfn-input--time,.cfn-input--date{width:auto;min-width:132px}',
      '.cfn-textarea{min-height:96px;resize:vertical}',
      '.cfn-input::placeholder,.cfn-textarea::placeholder{color:var(--dsw-alias-label-secondary);opacity:.7}',
      '.cfn-input:focus,.cfn-textarea:focus{border-color:var(--dsw-alias-brand-primary);box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,transparent)}',
      '.cfn-select{padding:8px 10px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;line-height:20px;outline:none;cursor:pointer}',
      '.cfn-swatches{display:flex;flex-wrap:wrap;gap:8px}',
      '.cfn-swatch{width:26px;height:26px;padding:0;border:2px solid transparent;border-radius:8px;background:var(--cfn-swatch);cursor:pointer;transition:box-shadow .15s ease,transform .15s ease}',
      '.cfn-swatch:hover{transform:translateY(-1px)}',
      '.cfn-swatch--active{box-shadow:0 0 0 2px var(--dsw-alias-bg-overlay),0 0 0 4px var(--cfn-swatch)}',
      '.cfn-swatch:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}',
      '.cfn-seg{display:inline-flex;flex-wrap:wrap;gap:2px;padding:3px;border-radius:8px;background:var(--dsw-alias-bg-layer-2)}',
      '.cfn-seg-btn{height:26px;padding:0 10px;border:none;border-radius:6px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;line-height:1;cursor:pointer;transition:background-color .15s ease,color .15s ease}',
      '.cfn-seg-btn:hover{color:var(--dsw-alias-label-primary)}',
      '.cfn-seg-btn--active{background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);font-weight:600;box-shadow:0 1px 3px rgba(0,0,0,.18)}',
      '.cfn-seg-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}',
      '.cfn-inline{display:flex;flex-wrap:wrap;align-items:flex-end;gap:10px}',
      '.cfn-inline .cfn-field{flex:0 0 auto}',
      '.cfn-chips{display:flex;flex-wrap:wrap;gap:6px}',
      '.cfn-chip{height:26px;min-width:34px;padding:0 8px;border:1px solid var(--dsw-alias-border-l2);border-radius:7px;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;line-height:1;cursor:pointer}',
      '.cfn-chip:hover{color:var(--dsw-alias-label-primary)}',
      '.cfn-chip--active{border-color:var(--dsw-alias-label-primary);background:var(--dsw-alias-label-primary);color:var(--dsw-alias-bg-base);font-weight:600}',
      '.cfn-chip:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}',
      '.cfn-error{margin:0;font-size:11px;line-height:16px;color:var(--dsw-alias-state-error-primary)}',
      '.cfn-dialog-actions{display:flex;justify-content:flex-end;gap:8px;padding-top:4px}',
      '@media (prefers-reduced-motion: reduce){.cfn-card--ringing{animation:none;border-color:var(--cfn-accent);box-shadow:inset 0 3px 0 0 var(--cfn-accent),0 0 0 2px color-mix(in srgb,var(--cfn-accent) 60%,transparent),0 0 18px 2px color-mix(in srgb,var(--cfn-accent) 45%,transparent)}.cfn-neonbar-glow,.cfn-neonbar-line{animation:none;opacity:.7}}',
    ].join('\n');

    /** Monotonic-ish client id; crypto.randomUUID is unavailable on insecure origins. */
    function createId() {
      try {
        if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
      } catch (error) {
        /* fall through to the timestamp id */
      }
      return 'note-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    }

    function isNumber(value) {
      return typeof value === 'number' && Number.isFinite(value);
    }

    function toDateInput(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return year + '-' + month + '-' + day;
    }

    function isoWeekday(date) {
      const day = date.getDay();
      return day === 0 ? 7 : day;
    }

    /** A near-future default for a one-time reminder, so a fresh pick is never already past. */
    function defaultOnceMoment() {
      const at = new Date(Date.now() + 5 * 60 * 1000);
      return {
        date: toDateInput(at),
        time: String(at.getHours()).padStart(2, '0') + ':' + String(at.getMinutes()).padStart(2, '0'),
      };
    }

    /** Local timestamp of a YYYY-MM-DD + HH:mm pair. */
    function timestampOf(dateText, timeText) {
      if (typeof dateText !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateText)) return NaN;
      if (typeof timeText !== 'string' || !TIME_PATTERN.test(timeText)) return NaN;
      const dateParts = dateText.split('-');
      const timeParts = timeText.split(':');
      const value = new Date(
        Number(dateParts[0]),
        Number(dateParts[1]) - 1,
        Number(dateParts[2]),
        Number(timeParts[0]),
        Number(timeParts[1]),
        0,
        0,
      ).getTime();
      return Number.isFinite(value) ? value : NaN;
    }

    function uniqueInts(values, min, max) {
      if (!Array.isArray(values)) return [];
      const seen = new Set();
      values.forEach(function (value) {
        if (Number.isInteger(value) && value >= min && value <= max) seen.add(value);
      });
      return Array.from(seen).sort(function (a, b) { return a - b; });
    }

    /** Accept only a complete reminder; anything malformed drops the reminder, not the note. */
    function normalizeReminder(value) {
      if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
      if (REMINDER_TYPES.indexOf(value.type) === -1 || value.type === 'none') return null;
      const time = typeof value.time === 'string' && TIME_PATTERN.test(value.time) ? value.time : '09:00';
      const weekdays = uniqueInts(value.weekdays, 1, 7);
      const monthDay = Number.isInteger(value.monthDay) ? Math.min(31, Math.max(1, value.monthDay)) : 1;
      const date = typeof value.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value.date) ? value.date : '';
      if (value.type === 'weekly' && weekdays.length === 0) return null;
      if (value.type === 'once' && !date) return null;
      return {
        type: value.type,
        time: time,
        weekdays: weekdays,
        monthDay: monthDay,
        date: date,
        firedAt: isNumber(value.firedAt) ? value.firedAt : null,
        ackAt: isNumber(value.ackAt) ? value.ackAt : null,
      };
    }

    /** Accept only a complete, usable note; drop anything a hand-edited store may contain. */
    function normalizeNote(value) {
      if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
      const title = typeof value.title === 'string' ? value.title : '';
      const content = typeof value.content === 'string' ? value.content : '';
      if (title === '' && content === '') return null;
      const color = PALETTE.some(function (entry) { return entry.id === value.color; }) ? value.color : PALETTE[0].id;
      const created = isNumber(value.createdAt) ? value.createdAt : Date.now();
      return {
        id: typeof value.id === 'string' && value.id !== '' ? value.id : createId(),
        title: title,
        content: content,
        color: color,
        createdAt: created,
        updatedAt: isNumber(value.updatedAt) ? value.updatedAt : created,
        reminder: normalizeReminder(value.reminder),
      };
    }

    function loadNotes() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.map(normalizeNote).filter(function (note) { return note !== null; });
      } catch (error) {
        return [];
      }
    }

    function persistNotes(notes) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (error) {
        /* storage full or unavailable: keep the in-memory list usable */
      }
    }

    function paletteOf(id) {
      for (let index = 0; index < PALETTE.length; index += 1) {
        if (PALETTE[index].id === id) return PALETTE[index];
      }
      return PALETTE[0];
    }

    function formatMoment(timestamp, tag) {
      const date = new Date(timestamp);
      try {
        return new Intl.DateTimeFormat(tag, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
      } catch (error) {
        try {
          return date.toLocaleString();
        } catch (inner) {
          return '';
        }
      }
    }

    /**
     * Most recent scheduled instant at or before `now`, or null.
     * Monthly days past the month's end clamp to its last day (user choice).
     */
    function occurrenceAt(reminder, now) {
      const timeParts = reminder.time.split(':');
      const hours = Number(timeParts[0]);
      const minutes = Number(timeParts[1]);
      const at = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0, 0).getTime();
      };
      const base = new Date(now);
      if (reminder.type === 'once') {
        const stamp = timestampOf(reminder.date, reminder.time);
        return Number.isFinite(stamp) && stamp <= now ? stamp : null;
      }
      if (reminder.type === 'daily') {
        let stamp = at(base);
        if (stamp > now) stamp = at(new Date(base.getFullYear(), base.getMonth(), base.getDate() - 1));
        return stamp;
      }
      if (reminder.type === 'weekly') {
        for (let back = 0; back < 8; back += 1) {
          const day = new Date(base.getFullYear(), base.getMonth(), base.getDate() - back);
          if (reminder.weekdays.indexOf(isoWeekday(day)) === -1) continue;
          const stamp = at(day);
          if (stamp <= now) return stamp;
        }
        return null;
      }
      if (reminder.type === 'monthly') {
        for (let back = 0; back < 2; back += 1) {
          const month = new Date(base.getFullYear(), base.getMonth() - back, 1);
          const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
          const stamp = at(new Date(month.getFullYear(), month.getMonth(), Math.min(reminder.monthDay, daysInMonth)));
          if (stamp <= now) return stamp;
        }
        return null;
      }
      return null;
    }

    /** A reminder rings until acknowledged; missed nodes never ring (user choice). */
    function isRinging(reminder) {
      if (!reminder || reminder.firedAt === null) return false;
      return reminder.ackAt === null || reminder.ackAt < reminder.firedAt;
    }

    function buildReminderFromDraft(draft, previous) {
      if (draft.reminderType === 'none') return null;
      const weekdays = draft.reminderType === 'weekly' ? uniqueInts(draft.weekdays, 1, 7) : [];
      const monthDay = draft.reminderType === 'monthly' ? draft.monthDay : 1;
      const date = draft.reminderType === 'once' ? draft.date : '';
      const unchanged = previous
        && previous.type === draft.reminderType
        && previous.time === draft.reminderTime
        && previous.monthDay === monthDay
        && previous.date === date
        && previous.weekdays.join(',') === weekdays.join(',');
      return {
        type: draft.reminderType,
        time: draft.reminderTime,
        weekdays: weekdays,
        monthDay: monthDay,
        date: date,
        firedAt: unchanged ? previous.firedAt : null,
        ackAt: unchanged ? previous.ackAt : null,
      };
    }

    function reminderProblem(draft, previous) {
      if (draft.reminderType === 'none') return '';
      if (!TIME_PATTERN.test(draft.reminderTime || '')) return 'time';
      if (draft.reminderType === 'weekly' && draft.weekdays.length === 0) return 'weekly';
      if (draft.reminderType === 'once') {
        if (!draft.date) return 'onceDate';
        const stamp = timestampOf(draft.date, draft.reminderTime);
        if (!Number.isFinite(stamp)) return 'onceDate';
        const unchanged = previous
          && previous.type === 'once'
          && previous.date === draft.date
          && previous.time === draft.reminderTime;
        if (!unchanged && stamp <= Date.now()) return 'oncePast';
      }
      return '';
    }

    function scheduleText(reminder, tag, t) {
      if (reminder.type === 'daily') return t('reminder.daily', { time: reminder.time });
      if (reminder.type === 'weekly') {
        const separator = t('list.separator');
        const days = reminder.weekdays.map(function (day) { return t('weekday.' + day); }).join(separator);
        return t('reminder.weekly', { days: days, time: reminder.time });
      }
      if (reminder.type === 'monthly') return t('reminder.monthly', { day: reminder.monthDay, time: reminder.time });
      if (reminder.type === 'once') return t('reminder.once', { date: reminder.date.split('-').join('/'), time: reminder.time });
      return '';
    }

    function sameIds(left, right) {
      if (left.length !== right.length) return false;
      for (let index = 0; index < left.length; index += 1) {
        if (left[index] !== right[index]) return false;
      }
      return true;
    }

    /** Notes plus the derived ringing set; one clock drives both the sidebar and the page. */
    function createNoteStore() {
      let notes = loadNotes();
      let lastTick = Date.now() - LOAD_GRACE_MS;
      let snapshot = null;
      const listeners = new Set();

      function computeActive(all) {
        const ids = [];
        all.forEach(function (note) {
          if (isRinging(note.reminder)) ids.push(note.id);
        });
        return ids;
      }

      function build() {
        const previous = snapshot;
        const activeIds = computeActive(notes);
        if (previous && previous.notes === notes && sameIds(previous.activeIds, activeIds)) return previous;
        snapshot = { notes: notes, activeIds: activeIds };
        return snapshot;
      }

      function publish() {
        const next = build();
        if (!next) return;
        listeners.forEach(function (listener) { listener(); });
      }

      function commit(nextNotes) {
        notes = nextNotes;
        persistNotes(notes);
        build();
        publish();
      }

      build();

      return {
        subscribe: function (listener) {
          listeners.add(listener);
          return function () { listeners.delete(listener); };
        },
        getSnapshot: function () { return snapshot; },
        tick: function () {
          const now = Date.now();
          const previous = lastTick;
          lastTick = now;
          let changed = false;
          const next = notes.map(function (note) {
            const reminder = note.reminder;
            if (!reminder || isRinging(reminder)) return note;
            const occurrence = occurrenceAt(reminder, now);
            if (occurrence === null || occurrence <= previous) return note;
            if (reminder.ackAt !== null && reminder.ackAt >= occurrence) return note;
            changed = true;
            return Object.assign({}, note, {
              reminder: Object.assign({}, reminder, { firedAt: occurrence, ackAt: null }),
            });
          });
          if (!changed) return;
          notes = next;
          persistNotes(notes);
          build();
          publish();
        },
        create: function (fields) {
          const now = Date.now();
          commit([Object.assign({ id: createId(), createdAt: now, updatedAt: now }, fields)].concat(notes));
        },
        update: function (id, fields) {
          commit(notes.map(function (note) {
            return note.id === id ? Object.assign({}, note, fields) : note;
          }));
        },
        remove: function (ids) {
          const drop = new Set(ids);
          commit(notes.filter(function (note) { return !drop.has(note.id); }));
        },
        acknowledge: function (ids) {
          const ack = new Set(ids);
          const now = Date.now();
          let changed = false;
          const next = notes.map(function (note) {
            if (!ack.has(note.id) || !isRinging(note.reminder)) return note;
            changed = true;
            return Object.assign({}, note, {
              reminder: Object.assign({}, note.reminder, { ackAt: now }),
            });
          });
          if (changed) commit(next);
        },
      };
    }

    function useStoreSnapshot(store) {
      const stateHook = React.useState(function () { return store.getSnapshot(); });
      React.useEffect(function () {
        let alive = true;
        const sync = function () {
          if (alive) stateHook[1](store.getSnapshot());
        };
        const unsubscribe = store.subscribe(sync);
        sync();
        return function () {
          alive = false;
          unsubscribe();
        };
      }, [store]);
      return stateHook[0];
    }

    function checkGlyph() {
      return h('svg', {
        width: 10, height: 10, viewBox: '0 0 12 12', fill: 'none', stroke: 'currentColor',
        strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: 'false',
      }, h('path', { d: 'M2.2 6.4 4.7 8.8 9.8 3.4' }));
    }

    function bellGlyph() {
      return h('svg', {
        width: 12, height: 12, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor',
        strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: 'false',
      },
        h('path', { d: 'M8 2.2a3.6 3.6 0 0 1 3.6 3.6v2.4l1.1 2.1H3.3l1.1-2.1V5.8A3.6 3.6 0 0 1 8 2.2Z' }),
        h('path', { d: 'M6.6 12.6a1.5 1.5 0 0 0 2.8 0' }),
      );
    }

    function plusGlyph() {
      return h('svg', {
        width: 14, height: 14, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor',
        strokeWidth: 1.8, strokeLinecap: 'round', 'aria-hidden': true, focusable: 'false',
      }, h('path', { d: 'M8 3.5v9' }), h('path', { d: 'M3.5 8h9' }));
    }

    function trashGlyph() {
      return h('svg', {
        width: 14, height: 14, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor',
        strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: 'false',
      },
        h('path', { d: 'M2.9 4.6h10.2' }),
        h('path', { d: 'M6.4 4.6V3.4h3.2v1.2' }),
        h('path', { d: 'M4.3 4.6l.6 7.6h6.2l.6-7.6' }),
        h('path', { d: 'M6.8 7.1v3.5' }),
        h('path', { d: 'M9.2 7.1v3.5' }),
      );
    }

    function pencilGlyph() {
      return h('svg', {
        width: 14, height: 14, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor',
        strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: 'false',
      },
        h('path', { d: 'M11.1 2.9l2 2-7.5 7.5-2.7.7.7-2.7 7.5-7.5Z' }),
        h('path', { d: 'M9.7 4.3l2 2' }),
      );
    }

    function emptyGlyph() {
      return h('svg', {
        width: 44, height: 44, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
        strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: 'false',
      },
        h('path', { d: 'M5.5 3.5h13A1.5 1.5 0 0 1 20 5v9.4L14.4 20H5.5A1.5 1.5 0 0 1 4 18.5v-13A1.5 1.5 0 0 1 5.5 3.5Z' }),
        h('path', { d: 'M20 14.4h-4.1a1.5 1.5 0 0 0-1.5 1.5V20' }),
        h('path', { d: 'M7.8 8.4h8.4' }),
        h('path', { d: 'M7.8 12h5' }),
      );
    }

    /** Build the page component against one locale service and the shared note store. */
    function createNotesPage(locale, store) {
      function NotesPage() {
        const stateHook = React.useState(function () { return locale.getSnapshot(); });
        const snapshot = stateHook[0];
        const setSnapshot = stateHook[1];

        const view = useStoreSnapshot(store);
        const notes = view.notes;
        const activeIds = view.activeIds;

        const selectedHook = React.useState(function () { return new Set(); });
        const selectedIds = selectedHook[0];
        const setSelectedIds = selectedHook[1];

        const draftHook = React.useState(null);
        const draft = draftHook[0];
        const setDraft = draftHook[1];

        const visibleHook = React.useState(function () { return new Set(); });
        const visibleIds = visibleHook[0];
        const setVisibleIds = visibleHook[1];

        const dialogRef = React.useRef(null);
        const titleRef = React.useRef(null);
        const scrollRef = React.useRef(null);
        const cardNodes = React.useRef(new Map());
        const dialogOpen = draft !== null;

        const t = React.useMemo(function () { return locale.bind(NS); }, []);

        React.useEffect(function () {
          return locale.subscribe(function () { setSnapshot(locale.getSnapshot()); });
        }, []);

        React.useEffect(function () {
          setSelectedIds(function (current) {
            if (current.size === 0) return current;
            const alive = new Set(notes.map(function (note) { return note.id; }));
            const next = new Set();
            let changed = false;
            current.forEach(function (id) {
              if (alive.has(id)) next.add(id);
              else changed = true;
            });
            return changed ? next : current;
          });
        }, [notes]);

        React.useEffect(function () {
          if (typeof IntersectionObserver === 'undefined' || !scrollRef.current) return undefined;
          const observer = new IntersectionObserver(function (entries) {
            setVisibleIds(function (current) {
              const next = new Set(current);
              let changed = false;
              entries.forEach(function (entry) {
                const id = entry.target.getAttribute('data-note-id');
                if (!id) return;
                if (entry.isIntersecting) {
                  if (!next.has(id)) { next.add(id); changed = true; }
                } else if (next.delete(id)) {
                  changed = true;
                }
              });
              return changed ? next : current;
            });
          }, { root: scrollRef.current, threshold: 0.35 });
          cardNodes.current.forEach(function (node) { observer.observe(node); });
          return function () { observer.disconnect(); };
        }, [notes]);

        React.useEffect(function () {
          if (!dialogOpen) return undefined;
          const previous = document.activeElement;
          const timer = window.setTimeout(function () {
            if (titleRef.current) titleRef.current.focus();
          }, 40);
          const onKeyDown = function (event) {
            if (event.key === 'Escape') {
              event.preventDefault();
              event.stopPropagation();
              setDraft(null);
              return;
            }
            if (event.key !== 'Tab' || !dialogRef.current) return;
            const nodes = dialogRef.current.querySelectorAll('button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
            if (nodes.length === 0) return;
            const first = nodes[0];
            const last = nodes[nodes.length - 1];
            if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first.focus();
            } else if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last.focus();
            }
          };
          document.addEventListener('keydown', onKeyDown, true);
          return function () {
            window.clearTimeout(timer);
            document.removeEventListener('keydown', onKeyDown, true);
            if (previous && typeof previous.focus === 'function') previous.focus();
          };
        }, [dialogOpen]);

        const openCreate = React.useCallback(function () {
          setDraft({
            id: null,
            title: '',
            content: '',
            color: PALETTE[notes.length % PALETTE.length].id,
            reminderType: 'none',
            reminderTime: '09:00',
            weekdays: [],
            monthDay: 1,
            date: toDateInput(new Date()),
          });
        }, [notes.length]);

        const openEdit = React.useCallback(function (note) {
          const reminder = note.reminder;
          setDraft({
            id: note.id,
            title: note.title,
            content: note.content,
            color: note.color,
            reminderType: reminder ? reminder.type : 'none',
            reminderTime: reminder ? reminder.time : '09:00',
            weekdays: reminder ? reminder.weekdays.slice() : [],
            monthDay: reminder ? reminder.monthDay : 1,
            date: reminder && reminder.date ? reminder.date : toDateInput(new Date()),
          });
        }, []);

        const updateDraft = function (patch) {
          setDraft(function (current) {
            if (!current) return current;
            return Object.assign({}, current, patch);
          });
        };

        const existingNote = draft && draft.id ? notes.find(function (note) { return note.id === draft.id; }) : null;
        const problem = draft ? reminderProblem(draft, existingNote ? existingNote.reminder : null) : '';
        const canSave = Boolean(draft) && (draft.title.trim() !== '' || draft.content.trim() !== '') && problem === '';

        const saveDraft = React.useCallback(function () {
          if (!draft) return;
          const title = draft.title.trim();
          const content = draft.content.trim();
          if (title === '' && content === '') return;
          if (reminderProblem(draft, existingNote ? existingNote.reminder : null) !== '') return;
          const now = Date.now();
          const fields = {
            title: title,
            content: content,
            color: draft.color,
            updatedAt: now,
            reminder: buildReminderFromDraft(draft, existingNote ? existingNote.reminder : null),
          };
          if (draft.id) store.update(draft.id, fields);
          else store.create(fields);
          setDraft(null);
        }, [draft, existingNote]);

        const toggleSelected = React.useCallback(function (id) {
          setSelectedIds(function (current) {
            const next = new Set(current);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
          });
        }, []);

        const deleteSelected = React.useCallback(function () {
          store.remove(Array.from(selectedIds));
          setSelectedIds(new Set());
        }, [selectedIds]);

        const stopOne = React.useCallback(function (id) {
          store.acknowledge([id]);
        }, []);

        const stopAll = React.useCallback(function () {
          store.acknowledge(activeIds);
        }, [activeIds]);

        const scrollToNote = React.useCallback(function (id) {
          const node = cardNodes.current.get(id);
          if (node && typeof node.scrollIntoView === 'function') {
            node.scrollIntoView({ block: 'center', behavior: 'smooth' });
          }
        }, []);

        const activeLocale = snapshot.active === 'zh' ? 'zh-CN' : snapshot.active;
        const totalLabel = t('count.total', { count: notes.length });
        const subtitle = selectedIds.size > 0 ? t('count.selected', { count: selectedIds.size }) + ' · ' + totalLabel : totalLabel;

        const activeNotes = activeIds
          .map(function (id) { return notes.find(function (note) { return note.id === id; }); })
          .filter(Boolean);
        const hiddenActive = activeNotes.filter(function (note) { return !visibleIds.has(note.id); });

        const renderCard = function (note) {
          const palette = paletteOf(note.color);
          const checked = selectedIds.has(note.id);
          const ringing = isRinging(note.reminder);
          const title = note.title || t('note.untitled');
          return h('div', {
            key: note.id,
            'data-note-id': note.id,
            ref: function (node) {
              if (node) cardNodes.current.set(note.id, node);
              else cardNodes.current.delete(note.id);
            },
            className: 'cfn-card' + (checked ? ' cfn-card--selected' : '') + (ringing ? ' cfn-card--ringing' : ''),
            style: { '--cfn-accent': palette.hex },
            onClick: function () { openEdit(note); },
          },
            h('div', { className: 'cfn-card-top' },
              h('label', {
                className: 'cfn-check',
                onClick: function (event) { event.stopPropagation(); },
              },
                h('input', {
                  type: 'checkbox',
                  className: 'cfn-check-input',
                  checked: checked,
                  onChange: function () { toggleSelected(note.id); },
                  'aria-label': t('note.select', { title: title }),
                }),
                h('span', { className: 'cfn-check-box', 'aria-hidden': 'true' }, checked ? checkGlyph() : null),
              ),
              h('button', {
                type: 'button',
                className: 'cfn-edit',
                onClick: function (event) { event.stopPropagation(); openEdit(note); },
                'aria-label': t('note.open', { title: title }),
                title: t('note.open', { title: title }),
              }, pencilGlyph()),
            ),
            ringing
              ? h('div', { className: 'cfn-ring' },
                h('span', { className: 'cfn-ring-label' }, bellGlyph(), t('reminder.ringing')),
                h('button', {
                  type: 'button',
                  className: 'cfn-ring-stop',
                  onClick: function (event) { event.stopPropagation(); stopOne(note.id); },
                }, t('action.stop')),
              )
              : null,
            h('div', { className: 'cfn-card-title' }, title),
            note.content ? h('p', { className: 'cfn-card-body' }, note.content) : null,
            note.reminder
              ? h('div', { className: 'cfn-card-reminder' }, bellGlyph(), h('span', null, scheduleText(note.reminder, activeLocale, t)))
              : null,
            h('div', { className: 'cfn-card-meta' }, t('note.updated', { time: formatMoment(note.updatedAt, activeLocale) })),
          );
        };

        const renderEmpty = function () {
          return h('div', { className: 'cfn-empty' },
            h('div', { className: 'cfn-empty-icon' }, emptyGlyph()),
            h('div', { className: 'cfn-empty-title' }, t('empty.title')),
            h('div', { className: 'cfn-empty-hint' }, t('empty.hint')),
          );
        };

        const renderReminderEditor = function () {
          const types = REMINDER_TYPES.map(function (kind) {
            const selected = draft.reminderType === kind;
            return h('button', {
              key: kind,
              type: 'button',
              className: selected ? 'cfn-seg-btn cfn-seg-btn--active' : 'cfn-seg-btn',
              'aria-pressed': selected,
              onClick: function () {
                const patch = { reminderType: kind };
                if (kind === 'weekly' && draft.weekdays.length === 0) patch.weekdays = [isoWeekday(new Date())];
                if (kind === 'monthly' && (!draft.monthDay || draft.monthDay < 1)) patch.monthDay = new Date().getDate();
                if (kind === 'once') {
                  const stamp = timestampOf(draft.date, draft.reminderTime);
                  if (!draft.date || !Number.isFinite(stamp) || stamp <= Date.now()) {
                    const moment = defaultOnceMoment();
                    patch.date = moment.date;
                    patch.reminderTime = moment.time;
                  }
                }
                updateDraft(patch);
              },
            }, t('reminder.type.' + kind));
          });

          const details = [];
          if (draft.reminderType === 'daily') {
            details.push(h('label', { className: 'cfn-field', key: 'time' },
              h('span', { className: 'cfn-field-label' }, t('field.reminder.time')),
              h('input', {
                className: 'cfn-input cfn-input--time',
                type: 'time',
                step: 60,
                value: draft.reminderTime,
                onChange: function (event) { updateDraft({ reminderTime: event.target.value }); },
              }),
            ));
          }
          if (draft.reminderType === 'weekly') {
            const chips = [1, 2, 3, 4, 5, 6, 7].map(function (day) {
              const activeDay = draft.weekdays.indexOf(day) !== -1;
              return h('button', {
                key: day,
                type: 'button',
                className: activeDay ? 'cfn-chip cfn-chip--active' : 'cfn-chip',
                'aria-pressed': activeDay,
                onClick: function () {
                  const next = activeDay
                    ? draft.weekdays.filter(function (value) { return value !== day; })
                    : draft.weekdays.concat(day);
                  updateDraft({ weekdays: next });
                },
              }, t('weekday.' + day));
            });
            details.push(h('div', { className: 'cfn-field', key: 'weekdays' },
              h('span', { className: 'cfn-field-label' }, t('field.reminder.weekdays')),
              h('div', { className: 'cfn-chips', role: 'group', 'aria-label': t('field.reminder.weekdays') }, chips),
            ));
            details.push(h('label', { className: 'cfn-field', key: 'time' },
              h('span', { className: 'cfn-field-label' }, t('field.reminder.time')),
              h('input', {
                className: 'cfn-input cfn-input--time',
                type: 'time',
                step: 60,
                value: draft.reminderTime,
                onChange: function (event) { updateDraft({ reminderTime: event.target.value }); },
              }),
            ));
          }
          if (draft.reminderType === 'monthly') {
            const options = [];
            for (let day = 1; day <= 31; day += 1) {
              options.push(h('option', { key: day, value: String(day) }, String(day)));
            }
            details.push(h('label', { className: 'cfn-field', key: 'monthDay' },
              h('span', { className: 'cfn-field-label' }, t('field.reminder.monthDay')),
              h('select', {
                className: 'cfn-select',
                value: String(draft.monthDay),
                onChange: function (event) { updateDraft({ monthDay: Number(event.target.value) }); },
              }, options),
            ));
            details.push(h('label', { className: 'cfn-field', key: 'time' },
              h('span', { className: 'cfn-field-label' }, t('field.reminder.time')),
              h('input', {
                className: 'cfn-input cfn-input--time',
                type: 'time',
                step: 60,
                value: draft.reminderTime,
                onChange: function (event) { updateDraft({ reminderTime: event.target.value }); },
              }),
            ));
          }
          if (draft.reminderType === 'once') {
            details.push(h('label', { className: 'cfn-field', key: 'date' },
              h('span', { className: 'cfn-field-label' }, t('field.reminder.date')),
              h('input', {
                className: 'cfn-input cfn-input--date',
                type: 'date',
                value: draft.date,
                onChange: function (event) { updateDraft({ date: event.target.value }); },
              }),
            ));
            details.push(h('label', { className: 'cfn-field', key: 'time' },
              h('span', { className: 'cfn-field-label' }, t('field.reminder.time')),
              h('input', {
                className: 'cfn-input cfn-input--time',
                type: 'time',
                step: 60,
                value: draft.reminderTime,
                onChange: function (event) { updateDraft({ reminderTime: event.target.value }); },
              }),
            ));
          }

          return h('div', { className: 'cfn-field' },
            h('span', { className: 'cfn-field-label' }, t('field.reminder')),
            h('div', { className: 'cfn-seg', role: 'group', 'aria-label': t('field.reminder') }, types),
            details.length > 0 ? h('div', { className: 'cfn-inline' }, details) : null,
            problem ? h('p', { className: 'cfn-error' }, t('reminder.error.' + problem)) : null,
          );
        };

        const renderDialog = function () {
          const isEdit = Boolean(draft.id);
          return h('div', {
            className: 'cfn-overlay',
            onMouseDown: function (event) {
              if (event.target === event.currentTarget) setDraft(null);
            },
          },
            h('div', {
              className: 'cfn-dialog',
              ref: dialogRef,
              role: 'dialog',
              'aria-modal': 'true',
              'aria-labelledby': 'cfn-dialog-title',
            },
              h('h2', { className: 'cfn-dialog-title', id: 'cfn-dialog-title' }, isEdit ? t('dialog.edit') : t('dialog.create')),
              h('label', { className: 'cfn-field' },
                h('span', { className: 'cfn-field-label' }, t('field.title')),
                h('input', {
                  ref: titleRef,
                  className: 'cfn-input',
                  type: 'text',
                  value: draft.title,
                  maxLength: 120,
                  placeholder: t('field.title.placeholder'),
                  onChange: function (event) { updateDraft({ title: event.target.value }); },
                }),
              ),
              h('label', { className: 'cfn-field' },
                h('span', { className: 'cfn-field-label' }, t('field.content')),
                h('textarea', {
                  className: 'cfn-textarea',
                  rows: 6,
                  value: draft.content,
                  placeholder: t('field.content.placeholder'),
                  onChange: function (event) { updateDraft({ content: event.target.value }); },
                }),
              ),
              h('div', { className: 'cfn-field' },
                h('span', { className: 'cfn-field-label' }, t('field.color')),
                h('div', { className: 'cfn-swatches', role: 'group', 'aria-label': t('field.color') },
                  PALETTE.map(function (entry) {
                    const selected = entry.id === draft.color;
                    return h('button', {
                      key: entry.id,
                      type: 'button',
                      className: selected ? 'cfn-swatch cfn-swatch--active' : 'cfn-swatch',
                      style: { '--cfn-swatch': entry.hex },
                      'aria-pressed': selected,
                      'aria-label': t('color.' + entry.id),
                      title: t('color.' + entry.id),
                      onClick: function () { updateDraft({ color: entry.id }); },
                    });
                  }),
                ),
              ),
              renderReminderEditor(),
              h('div', { className: 'cfn-dialog-actions' },
                h('button', { type: 'button', className: 'cfn-btn cfn-btn--ghost', onClick: function () { setDraft(null); } }, t('action.cancel')),
                h('button', {
                  type: 'button',
                  className: 'cfn-btn cfn-btn--primary',
                  onClick: saveDraft,
                  disabled: !canSave,
                }, t('action.save')),
              ),
            ),
          );
        };

        const renderNeonBar = function () {
          if (hiddenActive.length === 0) return null;
          const colors = hiddenActive.map(function (note) { return paletteOf(note.color).hex; });
          const gradient = 'linear-gradient(90deg, ' + colors.join(', ') + ')';
          return h('div', { className: 'cfn-neonbar', style: { '--cfn-bar-gradient': gradient } },
            h('div', { className: 'cfn-neonbar-glow', 'aria-hidden': 'true' }),
            h('div', { className: 'cfn-neonbar-line', 'aria-hidden': 'true' }),
            h('div', { className: 'cfn-neonbar-content' },
              h('span', { className: 'cfn-neonbar-text' }, bellGlyph(), t('reminder.count', { count: hiddenActive.length })),
              h('button', {
                type: 'button',
                className: 'cfn-btn cfn-btn--ghost cfn-btn--sm',
                onClick: function () { scrollToNote(hiddenActive[0].id); },
              }, t('action.view')),
              h('button', { type: 'button', className: 'cfn-btn cfn-btn--ghost cfn-btn--sm', onClick: stopAll }, t('action.stopAll')),
            ),
          );
        };

        return h('div', { className: 'cfn-page' },
          h('style', null, STYLE_TEXT),
          h('header', { className: 'cfn-header' },
            h('div', { className: 'cfn-heading' },
              h('h1', { className: 'cfn-title' }, t('panel.title')),
              h('div', { className: 'cfn-subtitle' }, subtitle),
            ),
            h('div', { className: 'cfn-actions' },
              h('button', {
                type: 'button',
                className: 'cfn-btn cfn-btn--primary',
                onClick: openCreate,
              }, plusGlyph(), t('action.add')),
              h('button', {
                type: 'button',
                className: 'cfn-btn cfn-btn--ghost',
                onClick: deleteSelected,
                disabled: selectedIds.size === 0,
                title: selectedIds.size === 0 ? t('delete.hint') : undefined,
              }, trashGlyph(), selectedIds.size > 0 ? t('action.delete') + ' (' + selectedIds.size + ')' : t('action.delete')),
            ),
          ),
          h('div', { className: 'cfn-scroll', ref: scrollRef },
            notes.length === 0 ? renderEmpty() : h('div', { className: 'cfn-grid' }, notes.map(renderCard)),
          ),
          renderNeonBar(),
          dialogOpen ? renderDialog() : null,
        );
      }

      return NotesPage;
    }

    /** Sidebar panel icon; shows a shaking alarm badge while any note is ringing. */
    function createNotesIcon(store) {
      const ICON_STYLE = [
        '.cfn-alarm-svg{display:block}',
        '.cfn-alarm-svg--ringing{animation:cfn-icon-blink 1.15s ease-in-out infinite;filter:drop-shadow(0 0 4px var(--cfn-icon-accent))}',
        '@keyframes cfn-icon-blink{0%,100%{opacity:1;filter:drop-shadow(0 0 5px var(--cfn-icon-accent))}45%{opacity:.32;filter:drop-shadow(0 0 1px var(--cfn-icon-accent))}65%{opacity:1}}',
        '.cfn-alarm-badge{transform-box:fill-box;transform-origin:center;animation:cfn-alarm-shake 1.05s ease-in-out infinite}',
        '@keyframes cfn-alarm-shake{0%,100%{transform:rotate(-9deg)}50%{transform:rotate(9deg)}}',
        '@media (prefers-reduced-motion: reduce){.cfn-alarm-svg--ringing{animation:none;opacity:1;filter:drop-shadow(0 0 4px var(--cfn-icon-accent))}.cfn-alarm-badge{animation:none}}',
      ].join('\n');

      function NotesIcon(props) {
        const size = props && typeof props.size === 'number' ? props.size : 20;
        const active = Boolean(props && props.active);
        const view = useStoreSnapshot(store);
        const ringing = view.activeIds.length > 0;
        const firstNote = ringing
          ? view.notes.find(function (note) { return note.id === view.activeIds[0]; })
          : null;
        const badgeColor = firstNote ? paletteOf(firstNote.color).hex : 'var(--dsw-alias-brand-primary)';

        return h('span', { style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } },
          h('style', null, ICON_STYLE),
          h('svg', {
            className: ringing ? 'cfn-alarm-svg cfn-alarm-svg--ringing' : 'cfn-alarm-svg',
            width: size,
            height: size,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: active ? 2.1 : 1.7,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            'aria-hidden': true,
            focusable: 'false',
            style: { display: 'block', '--cfn-icon-accent': badgeColor },
          },
            h('path', { d: 'M5.5 3.5h13A1.5 1.5 0 0 1 20 5v9.4L14.4 20H5.5A1.5 1.5 0 0 1 4 18.5v-13A1.5 1.5 0 0 1 5.5 3.5Z' }),
            h('path', { d: 'M20 14.4h-4.1a1.5 1.5 0 0 0-1.5 1.5V20' }),
            h('path', { d: 'M7.6 8.2h8.8' }),
            h('path', { d: 'M7.6 11.9h5.2' }),
            ringing
              ? h('g', { className: 'cfn-alarm-badge' },
                h('circle', {
                  cx: 18,
                  cy: 6,
                  r: 4.9,
                  style: { fill: 'var(--dsw-alias-bg-layer-1)', stroke: badgeColor },
                  strokeWidth: 1.6,
                }),
                h('path', {
                  d: 'M18 3.4v2.8l1.7 1.2',
                  style: { stroke: badgeColor },
                  strokeWidth: 1.4,
                }),
                h('path', {
                  d: 'M14.6 2.3l-1.2-1.2M21.4 2.3l1.2-1.2',
                  style: { stroke: badgeColor },
                  strokeWidth: 1.3,
                }),
              )
              : null,
          ),
        );
      }

      return NotesIcon;
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(function () {
          return ctx.locale.register(NS, DICT);
        }, 'colorful-notes: dictionaries');

        const store = createNoteStore();

        ctx.effect(function () {
          const interval = window.setInterval(function () { store.tick(); }, TICK_MS);
          const onVisibility = function () {
            if (!document.hidden) store.tick();
          };
          document.addEventListener('visibilitychange', onVisibility);
          return function () {
            window.clearInterval(interval);
            document.removeEventListener('visibilitychange', onVisibility);
          };
        }, 'colorful-notes: reminder clock');

        const t = ctx.locale.bind(NS);
        const NotesPage = createNotesPage(ctx.locale, store);
        const NotesIcon = createNotesIcon(store);

        ctx.slots.inject('sidebar.panellist', function () {
          return ctx.slots.register({
            name: 'sidebar.panellist',
            id: PANEL_ID,
            order: 20,
            label: function () { return t('panel.title'); },
          }, NotesIcon);
        });

        ctx.slots.inject('main', function () {
          return ctx.slots.register({ name: 'main', key: PANEL_ID }, NotesPage);
        });
      },
    };
  },
});
