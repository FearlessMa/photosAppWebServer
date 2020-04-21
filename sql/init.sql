
  CREATE DATABASE IF NOT EXISTS photosApp;
  USE photosApp;
  -- 删除外键约束
  ALTER TABLE p_photo
  DROP FOREIGN KEY fk_ablum_id;

  DROP TABLE IF EXISTS p_user;
  DROP TABLE IF EXISTS p_session;
  DROP TABLE IF EXISTS p_menus;
  DROP TABLE IF EXISTS p_roles;
  DROP TABLE IF EXISTS p_photo_album;
  DROP TABLE IF EXISTS p_photo;

  -- 用户表
  CREATE TABLE p_user (
      id BIGINT NOT NULL AUTO_INCREMENT COMMENT '用户表ID',
      username VARCHAR(50) NOT NULL COMMENT '用户名',
      password VARCHAR(50) NOT NULL COMMENT '用户密码，MD5加密',
      email VARCHAR(50) DEFAULT NULL,
      phone VARCHAR(20) DEFAULT NULL,
      question VARCHAR(100) DEFAULT NULL COMMENT '找回密码的问题',
      answer VARCHAR(100) DEFAULT NULL COMMENT '找回密码问题的答案',
      role int(4) NOT NULL COMMENT '角色0-管理员，1-普通用户',
      create_time datetime NOT NULL COMMENT '创建时间',
      update_time datetime NOT NULL COMMENT '最后一次更新时间',
      PRIMARY KEY (id),
      UNIQUE KEY user_name_unique (username) USING BTREE
  ) ENGINE=INNODB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 ;

  -- session表
  CREATE TABLE `p_session` (
      `id` BIGINT NOT NULL AUTO_INCREMENT,
      `sessionKey` VARCHAR(100) NOT NULL,
      `sessionValue` VARCHAR(1024) NOT NULL,
      PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

  -- 菜单表 menus props : id  icon name parent_id 
  CREATE TABLE `p_menus` (
    `id` INT(100) NOT NULL AUTO_INCREMENT COMMENT 'id',
    `m_id` INT(100) NOT NULL  COMMENT 'm_id',
    `icon` VARCHAR(100) DEFAULT NULL COMMENT '菜单icon',
    `parent_id` INT(4) DEFAULT NULL COMMENT '父菜单id',
    `role` INT(4) NOT NULL DEFAULT 1 COMMENT '角色菜单 1普通用户，0管理员',
    `name` VARCHAR(20) DEFAULT NULL COMMENT '菜单名称',
    `path` VARCHAR(50) DEFAULT NULL COMMENT '菜单路径',
    `create_time` datetime NOT NULL COMMENT '创建时间',
    `update_time` datetime NOT NULL COMMENT '最后一次更新时间',
    `descriptions` VARCHAR(100) DEFAULT NULL COMMENT '菜单描述',
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


  -- 角色表
  CREATE TABLE p_roles (
    role INT(10) NOT NULL COMMENT '角色值,1普通用户，0管理员',
    menus TEXT COMMENT 'json格式字符串64kb存储量',
    PRIMARY KEY (role)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

  -- 相册表
  CREATE TABLE p_photo_album (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '相册id',
    `user_id` BIGINT NOT NULL COMMENT '用户id',
    `name` VARCHAR(10) NOT NULL COMMENT '相册名称',
    `description` VARCHAR(100) DEFAULT NULL COMMENT '描述',
    `cover` VARCHAR(255) DEFAULT NULL COMMENT '封面',
    `create_time` datetime NOT NULL COMMENT '创建时间',
    `update_time` datetime NOT NULL COMMENT '最后一次更新时间',
    PRIMARY KEY (`id`)
  )ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

  -- 图片表
  CREATE TABLE p_photo (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '图片id',
    `user_id` BIGINT NOT NULL COMMENT '用户id',
    `album_id` BIGINT NOT NULL COMMENT '相册id',
    `name` VARCHAR(10) NOT NULL COMMENT '图片名称',
    `description` VARCHAR(100) DEFAULT NULL COMMENT '描述',
    `url` VARCHAR(255) default NULL COMMENT '图片地址',
    `create_time` datetime NOT NULL COMMENT '创建时间',
    `update_time` datetime NOT NULL COMMENT '最后一次更新时间',
    PRIMARY KEY (`id`)
  )ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

  -- 关联外键
  ALTER TABLE p_photo
  ADD CONSTRAINT fk_ablum_id
  FOREIGN KEY (album_id)
  REFERENCES p_photo_album (id);

  -- 插入数据
    INSERT INTO p_user(username,password,role,create_time,update_time) VALUES 
    (
      'admin','123456',0,'2019-11-27 21:26:28','2019-11-27 21:26:28'
    ),
    (
      'user','123456',1,'2019-11-27 21:26:28','2019-11-27 21:26:28'
    );

    INSERT INTO p_menus (icon,create_time,update_time,role,name,path,m_id,parent_id) VALUES 
    (
      'dashboard','2019-11-27 21:26:28','2019-11-27 21:26:28',1,'首页','/dashboard',0,null
    ),
    (
      'github','2019-11-27 21:26:28','2019-11-27 21:26:28',1,'相册','/photos',1,null
    ),
    (
      'setting','2019-11-27 21:26:28','2019-11-27 21:26:28',0,'配置','/config',2,null
    ),
    (
      'setting','2019-11-27 21:26:28','2019-11-27 21:26:28',0,'菜单配置','/menuConfig',3,2
    ),
    (
      'setting','2019-11-27 21:26:28','2019-11-27 21:26:28',0,'菜单配置1','/menuConfig',4,3
    ),
    (
      'setting','2019-11-27 21:26:28','2019-11-27 21:26:28',0,'菜单配置2','/menuConfig',5,4
    );

    INSERT INTO p_roles (role) VALUES (0),(1);

    INSERT INTO p_photo_album (user_id,name,description,cover,update_time,create_time) VALUES 
    ( 21,'默认相册','default','','2020-01-27 01:29:01','2020-01-27 01:29:01');

    INSERT INTO p_photo (user_id,album_id,name,description,update_time,create_time) VALUES
    (21,1,'test','test','2020-01-27 01:29:01','2020-01-27 01:29:01');

  SELECT 'ok' as 'result:';
