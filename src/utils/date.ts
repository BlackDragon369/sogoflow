/**
 * 日期工具函数
 */

/**
 * 格式化为 YYYY-MM-DD
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 获取今天的日期字符串
 */
export function todayStr(): string {
  return formatDate(new Date());
}

/**
 * 计算两个日期之间相差的天数
 */
export function daysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * 判断是否是连续的两天（date2 = date1 + 1天）
 */
export function isConsecutiveDay(prevDate: string, currDate: string): boolean {
  const d1 = new Date(prevDate);
  const d2 = new Date(currDate);
  const diff = (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24);
  return Math.abs(diff - 1) < 0.001;
}

/**
 * 判断两个日期是否是同一天
 */
export function isSameDay(date1: string | Date, date2: string | Date): boolean {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

/**
 * 格式化友好的日期显示
 */
export function formatFriendlyDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (isSameDay(date, today)) return '今天';
  if (isSameDay(date, yesterday)) return '昨天';

  const diffDays = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 7) return `${diffDays}天前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`;

  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

/**
 * 生成唯一ID
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}
