export const icons = {
  appIcon: require("./app-icon.png"),

  close: require("./common/close.png"),
  eye: require("./common/eye.png"),
  hide: require("./common/hide.png"),
  add: require("./common/add.png"),
  filter: require("./common/filter.png"),
  delete: require("./common/delete.png"),
  markDone: require("./common/mark-as-done.png"),
  priority: require("./common/priority.png"),
  comment: require("./common/comment.png"),
  logout: require("./common/logout.png"),
  threeDots: require("./common/three-dots.png"),
  checkMark: require("./common/check-mark.png"),
};

export type IconTypes = keyof typeof icons;
