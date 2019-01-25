SET NAMES UTF8;
DROP DATABASE IF EXISTS xiaofeiniu;
CREATE DATABASE xiaofeiniu CHARSET=UTF8;
USE xiaofeiniu;


/**管理员信息**/
CREATE TABLE xfn_admin(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  aname VARCHAR(32) UNIQUE,
  apwd	VARCHAR(64)  
);
INSERT INTO xfn_admin VALUES
(NULL,'admin',PASSWORD('123456')),
(NULL,'boss',PASSWORD('999999'));

/**项目全局设置**/
CREATE TABLE xfn_settings(
  sid INT PRIMARY KEY AUTO_INCREMENT,
  appName VARCHAR(32),        #应用/店家名称
  apiUrl VARCHAR(64),         #数据API子系统地址
  AdminUrl VARCHAR(64),       #管理后台子系统地址
  appUrl VARCHAR(64),		      #顾客App子系统地址
  icp VARCHAR(64),            #系统备案号
  Copyright VARCHAR(64)       #版权声明
);

/**桌台信息表**/
CREATE TABLE xfn_table(
  tid INT PRIMARY KEY AUTO_INCREMENT,
  tname VARCHAR(64),           #桌台昵称
  type VARCHAR(16),            #桌台类型，如3-4人桌
  status INT                   #当前状态
);


