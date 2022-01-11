-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: waimao_demo_erda
-- ------------------------------------------------------
-- Server version	5.7.27-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `erdai_ad`
--

DROP TABLE IF EXISTS `erdai_ad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_ad` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `time` varchar(20) DEFAULT NULL,
  `admin_user` varchar(30) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `weight` int(5) DEFAULT '0',
  `description` varchar(220) DEFAULT NULL,
  `parent` int(10) DEFAULT '0',
  `url` varchar(100) DEFAULT NULL,
  `att_type` int(5) DEFAULT NULL,
  `outflag` int(5) DEFAULT NULL,
  `image` varchar(240) DEFAULT NULL,
  `lang` varchar(50) DEFAULT NULL,
  `position` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `type` (`att_type`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_ad`
--

LOCK TABLES `erdai_ad` WRITE;
/*!40000 ALTER TABLE `erdai_ad` DISABLE KEYS */;
INSERT INTO `erdai_ad` VALUES (2,'1641169537','master','幻灯01',0,'01',0,'',1,1,'[{\"name\":\"image\\/20220103\\/55f18484d2eb93f54685bdf6435566fe.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220103\\/55f18484d2eb93f54685bdf6435566fe.jpg\",\"a\":0,\"b\":0,\"uid\":1641169537570,\"status\":\"success\"}]','zh',1),(3,'1641169579','master','幻灯02',0,'',0,'',1,1,'[{\"name\":\"image\\/20220103\\/ca8cbba9fb73e518b8e11d8c544e7668.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220103\\/ca8cbba9fb73e518b8e11d8c544e7668.jpg\",\"a\":0,\"b\":0,\"uid\":1641169579973,\"status\":\"success\"}]','zh',1),(4,'1638342184','master','产品页大图',0,'',0,'',1,1,'[{\"name\":\"image\\/20211201\\\\6bc33f161f91f1aba00893db86dff050.jpg\",\"url\":\"http:\\/\\/api.pc.waimao.com\\/uploads\\/image\\/20211201\\\\6bc33f161f91f1aba00893db86dff050.jpg\",\"uid\":1638342181919,\"status\":\"success\"}]','zh',2),(6,'1638421399','master','单页页面大图',0,'',0,'',1,1,'[{\"name\":\"image\\/20211202\\\\8cc966ccf0e500edb799b3c415bf4210.jpg\",\"url\":\"http:\\/\\/api.pc.waimao.com\\/uploads\\/image\\/20211202\\\\8cc966ccf0e500edb799b3c415bf4210.jpg\",\"uid\":1638421397026,\"status\":\"success\"}]','zh',4),(7,'1638514209','master','丁香智旅',0,'',0,'https://www.erdaicms.com',2,1,'[]','zh',1),(8,'1638514226','master','驴赞',0,'',0,'https://www.erdaicms.cn',2,1,'[]','zh',1);
/*!40000 ALTER TABLE `erdai_ad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_admin`
--

DROP TABLE IF EXISTS `erdai_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_admin` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `roles` varchar(220) DEFAULT NULL,
  `weight` int(5) DEFAULT NULL,
  `admin_user` varchar(50) DEFAULT NULL,
  `description` varchar(220) DEFAULT NULL,
  `login_num` int(6) DEFAULT '0',
  `login_time` varchar(20) DEFAULT NULL,
  `status` varchar(5) DEFAULT '1' COMMENT '状态',
  `department_rules` varchar(220) DEFAULT NULL,
  `btn_rules` varchar(220) DEFAULT NULL,
  `position_rules` varchar(220) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_admin`
--

LOCK TABLES `erdai_admin` WRITE;
/*!40000 ALTER TABLE `erdai_admin` DISABLE KEYS */;
INSERT INTO `erdai_admin` VALUES (1,'master','e10adc3949ba59abbe56e057f20f883e','http://cms.master.erdaicms.cn/uploads/image/20211104/ffc4723db2a1a0f52e2fd01906bdbc50.jpg','德阳市',NULL,'[\"admin\"]',NULL,NULL,NULL,60,'1641876328','1',NULL,NULL,NULL),(21,'旌阳区农业农村局','e10adc3949ba59abbe56e057f20f883e',NULL,'旌阳区农业农村局','1636034497','[3]',0,'中江县农业农村局','',0,NULL,'1','[]','[7,6,5,3,2,1]','[4,3]'),(22,'罗江区农业农村局','e10adc3949ba59abbe56e057f20f883e',NULL,'罗江区农业农村局','1636034487','[3]',0,'中江县农业农村局','',0,NULL,'1','[]','[7,6,5,3,2,1]','[4,3]'),(23,'广汉市农业农村局','e10adc3949ba59abbe56e057f20f883e',NULL,'广汉市农业农村局','1636034484','[3]',0,'中江县农业农村局','',0,NULL,'1','[]','[7,6,5,3,2,1]','[4,3]'),(24,'什邡市农业农村局','e10adc3949ba59abbe56e057f20f883e',NULL,'什邡市农业农村局','1636034478','[3]',0,'中江县农业农村局','',0,NULL,'1','[]','[7,6,5,3,2,1]','[4,3]'),(25,'绵竹市农业农村局','e10adc3949ba59abbe56e057f20f883e',NULL,'绵竹市农业农村局','1636034658','[3]',0,'中江县农业农村局','',0,NULL,'1','[]','[7,6,5,3,2,1]','[4,3]'),(26,'中江县农业农村局','e10adc3949ba59abbe56e057f20f883e',NULL,'中江县农业农村局','1636034647','[3]',0,'中江县农业农村局','',0,NULL,'1','[]','[7,6,5,3,2,1]','[4,3]');
/*!40000 ALTER TABLE `erdai_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_case`
--

DROP TABLE IF EXISTS `erdai_case`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_case` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(220) DEFAULT NULL,
  `seo_title` varchar(220) DEFAULT NULL,
  `keyword` varchar(220) DEFAULT NULL,
  `description` varchar(240) DEFAULT NULL,
  `parent` varchar(200) DEFAULT '0',
  `weight` int(10) DEFAULT '100',
  `image` text,
  `content` text,
  `content1` text,
  `price` decimal(8,2) DEFAULT NULL,
  `costprice` decimal(8,2) DEFAULT NULL,
  `marketprice` decimal(8,2) DEFAULT NULL,
  `stock` int(10) DEFAULT '0',
  `stockunit` varchar(20) DEFAULT NULL,
  `click` int(10) DEFAULT '0',
  `flag` varchar(200) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `admin_user` varchar(50) DEFAULT NULL,
  `lang` varchar(20) DEFAULT NULL,
  `attvalue` text,
  `attvaluebox` text,
  `attvaluetext` text,
  `attvaluetextarea` text,
  `status` varchar(10) DEFAULT '1',
  `department_rules` varchar(50) DEFAULT NULL,
  `fanyi_from_id` int(12) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_case`
--

LOCK TABLES `erdai_case` WRITE;
/*!40000 ALTER TABLE `erdai_case` DISABLE KEYS */;
INSERT INTO `erdai_case` VALUES (7,'工程机械案列','','','','[17]',0,'[{\"name\":\"image\\/20211203\\\\daa6c412113a3902776beb22930d0c21.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/\\/uploads\\/image\\/20211203\\\\daa6c412113a3902776beb22930d0c21.jpg\",\"uid\":1638501793837,\"status\":\"success\"}]','','',0.00,0.00,0.00,0,'',0,'[]','1641190993','master','zh','\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\"','\"[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]\"','\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\"','\"[[],[],[],[],[],[],[],[],[],[]]\"','1',NULL,0),(8,'List of construction machinery','','','','0',0,'[{\"name\":\"image\\/20211203\\\\daa6c412113a3902776beb22930d0c21.jpg\",\"url\":\"http:\\/\\/api.pc.waimao.com\\/uploads\\/image\\/20211203\\\\daa6c412113a3902776beb22930d0c21.jpg\",\"uid\":1638501793837,\"status\":\"success\"}]','Construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list','Construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list construction machinery case list',0.00,0.00,0.00,0,'',0,'[]','1638501810','master','en','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,7);
/*!40000 ALTER TABLE `erdai_case` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_case_attribute`
--

DROP TABLE IF EXISTS `erdai_case_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_case_attribute` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `time` varchar(20) DEFAULT NULL,
  `admin_user` varchar(20) DEFAULT NULL,
  `lang` varchar(10) DEFAULT NULL,
  `weight` int(5) DEFAULT '100',
  `name` varchar(200) DEFAULT NULL,
  `shuxing` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_case_attribute`
--

LOCK TABLES `erdai_case_attribute` WRITE;
/*!40000 ALTER TABLE `erdai_case_attribute` DISABLE KEYS */;
INSERT INTO `erdai_case_attribute` VALUES (2,'1636163248','master','zh',0,'色系','[{\"name\":\"\\u989c\\u8272\",\"value\":\"\\u7ea2\\n\\u9ec4\\n\\u84dd\",\"type\":\"1\",\"weight\":\"0\"},{\"name\":\"\\u5927\\u5c0f\",\"value\":\"\\u5c0f\\n\\u4e2d\\n\\u5927\",\"type\":\"2\",\"weight\":\"4\"}]'),(3,'1636163301','master','zh',0,'型号','[{\"name\":\"\\u578b\\u53f7\",\"value\":\"88\\n99\\n11\\nxx\\nzz\",\"type\":\"1\",\"weight\":\"\"}]'),(5,'1636188237','master','zh',0,'安装说明','[{\"name\":\"\\u5b89\\u88c5\\u8bf4\\u660e\",\"value\":\"\",\"type\":\"3\",\"weight\":\"5\"}]');
/*!40000 ALTER TABLE `erdai_case_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_case_classify`
--

DROP TABLE IF EXISTS `erdai_case_classify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_case_classify` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(220) DEFAULT NULL,
  `seo_title` varchar(220) DEFAULT NULL,
  `keyword` varchar(220) DEFAULT NULL,
  `description` varchar(240) DEFAULT NULL,
  `parent` int(5) DEFAULT '0' COMMENT '上级分类',
  `weight` int(5) DEFAULT '0',
  `admin_user` varchar(30) DEFAULT '0',
  `time` int(12) DEFAULT NULL,
  `lang` varchar(20) DEFAULT NULL,
  `delete_time` varchar(20) DEFAULT '1',
  `image` text,
  `fanyi_from_id` int(12) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_case_classify`
--

LOCK TABLES `erdai_case_classify` WRITE;
/*!40000 ALTER TABLE `erdai_case_classify` DISABLE KEYS */;
INSERT INTO `erdai_case_classify` VALUES (15,'工程解析','','','',0,0,'master',1638501637,'zh','1','[]',0),(16,'Engineering analysis','','','',0,0,'master',1638501637,'en','1','[]',15),(17,'家装案例','','','',0,0,'master',1641189565,'zh','1','[]',0);
/*!40000 ALTER TABLE `erdai_case_classify` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_contact`
--

DROP TABLE IF EXISTS `erdai_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_contact` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `time` varchar(20) DEFAULT NULL,
  `admin_user` varchar(30) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `weight` int(5) DEFAULT '0',
  `description` varchar(220) DEFAULT NULL,
  `image` varchar(240) DEFAULT NULL,
  `lang` varchar(50) DEFAULT NULL,
  `parent` int(2) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_contact`
--

LOCK TABLES `erdai_contact` WRITE;
/*!40000 ALTER TABLE `erdai_contact` DISABLE KEYS */;
INSERT INTO `erdai_contact` VALUES (7,'1638409900','master','联系电话',0,'13888888888','[]','zh',0),(8,'1638409922','master','电子邮件',0,'waimao@qq.com','[]','zh',0),(9,'1638410024','master','联系地址',0,'长沙市国家级经济技术开发区188号','[]','zh',0),(10,'1638410034','master','QQ',0,'156779955','[]','zh',0);
/*!40000 ALTER TABLE `erdai_contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_department`
--

DROP TABLE IF EXISTS `erdai_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_department` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `time` varchar(20) DEFAULT NULL,
  `admin_user` varchar(30) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `weight` int(5) DEFAULT '0',
  `description` varchar(220) DEFAULT NULL,
  `parent` int(10) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_department`
--

LOCK TABLES `erdai_department` WRITE;
/*!40000 ALTER TABLE `erdai_department` DISABLE KEYS */;
INSERT INTO `erdai_department` VALUES (1,'1637810967','master','000',0,'',0),(2,'1637810975','master','1111',0,'',1);
/*!40000 ALTER TABLE `erdai_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_lang`
--

DROP TABLE IF EXISTS `erdai_lang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_lang` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `title` varchar(60) DEFAULT NULL,
  `litpic` varchar(60) DEFAULT NULL,
  `weight` int(5) DEFAULT '100',
  `status` int(5) DEFAULT '1',
  `lang` varchar(30) DEFAULT NULL,
  `index` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_lang`
--

LOCK TABLES `erdai_lang` WRITE;
/*!40000 ALTER TABLE `erdai_lang` DISABLE KEYS */;
INSERT INTO `erdai_lang` VALUES (1,'中文','/uploads/default/chinese.gif',100,1,'zh',1),(2,'Русский','/uploads/default/russian.gif',100,1,'ru',0),(3,'Deutsch','/uploads/default/german.gif',100,1,'de',0),(4,'Español','/uploads/default/spanish.gif',100,1,'spa',0),(5,'Portuguese','/uploads/default/portugues.gif',100,1,'pt',0),(6,'Türkçe','/uploads/default/turkish.gif',100,1,'tr',0),(7,'عربي','/uploads/default/arabic.gif',100,1,'ara',0),(8,'English','/uploads/default/english.gif',100,1,'en',0);
/*!40000 ALTER TABLE `erdai_lang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_menu`
--

DROP TABLE IF EXISTS `erdai_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_menu` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `path` varchar(100) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `hidden` int(2) DEFAULT '0',
  `redirect` varchar(100) DEFAULT NULL,
  `meta` varchar(100) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `admin_user` varchar(50) DEFAULT NULL,
  `weight` int(5) DEFAULT NULL COMMENT '1',
  `parent` int(5) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_menu`
--

LOCK TABLES `erdai_menu` WRITE;
/*!40000 ALTER TABLE `erdai_menu` DISABLE KEYS */;
INSERT INTO `erdai_menu` VALUES (1,'/setting','Setting',0,'/setting/page','{\"title\":\"配置中心\",\"icon\":\"component\",\"roles\": [\"admin\"]}',NULL,NULL,1,0),(2,'siteinfo','siteinfoSetting',0,NULL,'{\"title\":\"网站配置\",\"icon\":\"el-icon-s-platform\",\"roles\": [\"admin\"]}',NULL,NULL,1,1),(3,'/onepage','Onepage',0,'/onepage/list','{\"title\":\"单页管理\",\"icon\":\"el-icon-folder-opened\",\"roles\": [\"admin\"]}',NULL,NULL,3,0),(4,'list','listOnepage',0,NULL,'{\"title\":\"单页列表\",\"icon\":\"list\",\"roles\": [\"admin\"]}',NULL,NULL,100,3),(5,'classify','classifyOnepage',0,NULL,'{\"title\":\"单页分类\",\"icon\":\"el-icon-document-copy\",\"roles\": [\"admin\"]}',NULL,NULL,100,3),(6,'/permission','permission',0,'/permission/roles','{\"title\":\"权限管理\",\"icon\":\"el-icon-cpu\",\"roles\": [\"admin\"]}',NULL,NULL,2,0),(7,'roles','permissionRoles',0,NULL,'{\"title\":\"角色管理\",\"icon\":\"el-icon-s-check\",\"roles\": [\"admin\"]}',NULL,NULL,100,6),(8,'department','permissionRoles',0,NULL,'{\"title\":\"部门管理\",\"icon\":\"el-icon-suitcase-1\",\"roles\": [\"admin\"]}',NULL,NULL,100,6),(9,'users','permissionRoles',0,NULL,'{\"title\":\"用户管理\",\"icon\":\"el-icon-user-solid\",\"roles\": [\"admin\"]}',NULL,NULL,100,6),(10,'/project','project',1,'/project/index','{\"title\":\"项目储备管理\",\"icon\":\"el-icon-s-shop\",\"roles\": [\"admin\"]}',NULL,NULL,4,0),(11,'declare','declare',1,NULL,'{\"title\":\"项目申报管理\",\"icon\":\"el-icon-upload\",\"roles\": [\"admin\"]}',NULL,NULL,100,10),(12,'list','list',0,NULL,'{\"title\":\"项目浏览\",\"icon\":\"el-icon-s-operation\",\"roles\": [\"admin\"]}',NULL,NULL,100,10),(13,'/project_dd','project_dd',1,'/project_dd/index','{\"title\":\"实施项目管理\",\"icon\":\"el-icon-upload\",\"roles\": [\"admin\"]}',NULL,NULL,5,0),(14,'diaodu','diaodu',0,NULL,'{\"title\":\"项目调度管理\",\"icon\":\"el-icon-upload\",\"roles\": [\"admin\"]}',NULL,NULL,100,13),(15,'list','list',0,NULL,'{\"title\":\"项目明细\",\"icon\":\"el-icon-upload\",\"roles\": [\"admin\"]}',NULL,NULL,100,13),(16,'/','Dashboard',0,'/dashboard','{\"title\":\"控制台\",\"icon\":\"dashboard\",\"roles\": [\"admin\"]}',NULL,NULL,0,0),(17,'systeminfo','systeminfoSetting',0,NULL,'{\"title\":\"系统配置\",\"icon\":\"component\",\"roles\": [\"admin\"]}',NULL,NULL,0,1),(18,'position','permissionRoles',0,NULL,'{\"title\":\"岗位管理\",\"icon\":\"el-icon-s-cooperation\",\"roles\": [\"admin\"]}',NULL,NULL,101,6),(19,'product','Product',0,NULL,'{\"title\":\"产品管理\",\"icon\":\"el-icon-s-shop\",\"roles\": [\"admin\"]}',NULL,NULL,6,0),(20,'attribute','attribute',0,'/product/attribute','{\"title\":\"产品属性\",\"icon\":\"el-icon-connection\",\"roles\": [\"admin\"]}',NULL,NULL,0,19),(21,'classify','classify',0,'/product/classify','{\"title\":\"产品分类\",\"icon\":\"el-icon-document-copy\",\"roles\": [\"admin\"]}',NULL,NULL,0,19),(22,'list','list',0,'/product/list','{\"title\":\"产品列表\",\"icon\":\"list\",\"roles\": [\"admin\"]}',NULL,NULL,NULL,19),(23,'navigation','navigation',0,NULL,'{\"title\":\"导航配置\",\"icon\":\"el-icon-place\",\"roles\": [\"admin\"]}',NULL,NULL,4,1),(24,'ad','ad',0,NULL,'{\"title\":\"广告配置\",\"icon\":\"el-icon-data-line\",\"roles\": [\"admin\"]}',NULL,NULL,5,1),(25,'contact','contact',0,NULL,'{\"title\":\"联系方式\",\"icon\":\"el-icon-phone\",\"roles\": [\"admin\"]}',NULL,NULL,4,1),(26,'case','case',0,NULL,'{\"title\":\"案例管理\",\"icon\":\"el-icon-video-camera-solid\",\"roles\": [\"admin\"]}',NULL,NULL,7,0),(27,'list','list',0,NULL,'{\"title\":\"案例列表\",\"icon\":\"list\",\"roles\": [\"admin\"]}',NULL,NULL,0,26),(28,'classify','classify',0,NULL,'{\"title\":\"案例分类\",\"icon\":\"el-icon-document-copy\",\"roles\": [\"admin\"]}',NULL,NULL,0,26),(29,'news','news',0,NULL,'{\"title\":\"新闻管理\",\"icon\":\"el-icon-reading\",\"roles\": [\"admin\"]}',NULL,NULL,8,0),(30,'list','list',0,NULL,'{\"title\":\"新闻列表\",\"icon\":\"list\",\"roles\": [\"admin\"]}',NULL,NULL,0,29),(31,'classify','classify',0,NULL,'{\"title\":\"新闻分类\",\"icon\":\"el-icon-document-copy\",\"roles\": [\"admin\"]}',NULL,NULL,0,29),(32,'plug','plug',0,NULL,'{\"title\":\"第三方插件配置\",\"icon\":\"el-icon-s-opportunity\",\"roles\": [\"admin\"]}',NULL,NULL,9,1),(34,'data','data',0,NULL,'{\"title\":\"数据管理\",\"icon\":\"el-icon-platform-eleme\",\"roles\": [\"admin\"]}',NULL,NULL,9,0),(35,'visitor_message','visitor_message',0,NULL,'{\"title\":\"留言数据\",\"icon\":\"el-icon-eleme\",\"roles\": [\"admin\"]}',NULL,NULL,1,34);
/*!40000 ALTER TABLE `erdai_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_navigation`
--

DROP TABLE IF EXISTS `erdai_navigation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_navigation` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `time` varchar(20) DEFAULT NULL,
  `admin_user` varchar(30) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `weight` int(5) DEFAULT '0',
  `description` varchar(220) DEFAULT NULL,
  `parent` int(10) DEFAULT '0',
  `url` varchar(100) DEFAULT NULL,
  `att_type` int(5) DEFAULT NULL,
  `outflag` int(5) DEFAULT NULL,
  `image` varchar(240) DEFAULT NULL,
  `lang` varchar(50) DEFAULT NULL,
  `fanyi_from_id` int(5) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `type` (`att_type`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_navigation`
--

LOCK TABLES `erdai_navigation` WRITE;
/*!40000 ALTER TABLE `erdai_navigation` DISABLE KEYS */;
INSERT INTO `erdai_navigation` VALUES (3,'1641185501','master','网站首页',0,'首页',0,'/',1,1,'[]','zh',0),(4,'1641185501','master','产品中心',1,'产品',0,'',1,1,'[]','zh',0),(5,'1641182581','master','LED工程照明',0,'LED工程照明',4,'/zh/product_list/id18.html',1,1,'[]','zh',0),(6,'1641182245','master','Led光源系列',0,'',4,'/zh/product_list/id16.html',1,1,'[]','zh',0),(7,'1641203235','master','HOME',0,'HOME',0,'/',1,1,'[]','en',0),(8,'1641203126','master','Products',1,'Products',0,'',1,1,'[]','en',0),(9,'1641203111','master','LED driving power supply',0,'LED driving power supply',8,'/en/product_list/id20.html',1,1,'[]','en',0),(11,'1641185501','master','关于我们',0,'',0,'',2,1,'[]','zh',0),(12,'1641185501','master','联系我们',0,'',0,'',2,1,'[]','zh',0),(13,'1641185501','master','产品中心',0,'',0,'',2,1,'[]','zh',0),(14,'1641185501','master','新闻资讯',0,'',0,'',2,1,'[]','zh',0),(15,'1641203126','master','News information',2,'',0,'',2,1,'[]','en',14),(16,'1641183337','master','LED商业照明',0,'LED商业照明',4,'/zh/product_list/id17.html',1,1,'[]','zh',0),(17,'1641183479','master','LED驱动电源',0,'LED驱动电源',4,'/zh/product_list/id19.html',1,1,'[]','zh',0),(18,'1641185501','master','新闻资讯',2,'',0,'/zh/news_list/id18.html',1,1,'[]','zh',0),(19,'1641189935','master','案例展示',3,'案例展示',0,'/zh/cases_list/id17.html',1,1,'[]','zh',0),(20,'1641192964','master','关于我们',4,'关于我们',0,'/zh/page/id1.html',1,1,'[]','zh',0),(21,'1641192980','master','联系我们',5,'联系我们',0,'/zh/page/id2.html',1,1,'[]','zh',0),(22,'1641185501','master','About us',0,'',0,'',2,1,'[]','en',11),(23,'1641185501','master','عنا',0,'',0,'',2,1,'[]','ara',11),(24,'1641185501','master','Sobre nós',0,'',0,'',2,1,'[]','pt',11);
/*!40000 ALTER TABLE `erdai_navigation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_news`
--

DROP TABLE IF EXISTS `erdai_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_news` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(220) DEFAULT NULL,
  `seo_title` varchar(220) DEFAULT NULL,
  `keyword` varchar(220) DEFAULT NULL,
  `description` varchar(400) DEFAULT NULL,
  `parent` varchar(200) DEFAULT '0',
  `weight` int(10) DEFAULT '100',
  `image` text,
  `content` text,
  `content1` text,
  `price` decimal(8,2) DEFAULT NULL,
  `costprice` decimal(8,2) DEFAULT NULL,
  `marketprice` decimal(8,2) DEFAULT NULL,
  `stock` int(10) DEFAULT '0',
  `stockunit` varchar(20) DEFAULT NULL,
  `click` int(10) DEFAULT '0',
  `flag` varchar(200) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `admin_user` varchar(50) DEFAULT NULL,
  `lang` varchar(20) DEFAULT NULL,
  `attvalue` text,
  `attvaluebox` text,
  `attvaluetext` text,
  `attvaluetextarea` text,
  `status` varchar(10) DEFAULT '1',
  `department_rules` varchar(50) DEFAULT NULL,
  `fanyi_from_id` int(12) DEFAULT '0',
  `attvalueimage` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_news`
--

LOCK TABLES `erdai_news` WRITE;
/*!40000 ALTER TABLE `erdai_news` DISABLE KEYS */;
INSERT INTO `erdai_news` VALUES (7,'苏州豪安诚照明工程有限公司','苏州豪安诚照明工程有限公司','苏州豪安诚照明工程有限公司','苏州豪安诚照明工程有限公司','[15]',0,'[]','<p><span style=\"font-size: 15px;\">于2006年11月份在江苏省苏州市创立，公司注册资金5000万，经过10多年的发展与沉淀，已具有一定规模及实力，现分别在广东、江苏设立生产基地，专注于室内/户外工程照明,高杆灯,高压钠灯,太阳能庭院灯,太阳能路灯价格合理,是太阳能路灯厂家,景观灯厂家,凭借10多年的照明行业经验,在LED照明灯具节能改造等大型照明工程的光源,灯具,电器产品生产及销售!户外照明、工程照明、太阳能照明及商业照明的光源、电器、灯具、灯杆、监控杆等常规、非常规照明产品的设计、制造及安装，产品广泛应用于公共建筑、高速公路、城市主干道、乡村道路、桥梁、隧道、厂矿照明、景观照明、城市亮化、车站、机场、广场、港口码头、加油站、球场、体育场馆、植物生长、渔船灯光捕鱼、大型商场超市、品牌专卖店、酒店、小区、旅游景点等各种工程或商业领域。</span></p>\n<p><span style=\"font-size: 15px;\"><img src=\"http://waimao.admin.erdaicms.com/uploads//image/20220103/b22e0dc421f213d74a068d7582181562.jpg\" alt=\"\" width=\"902\" height=\"400\" /></span></p>','<p><span style=\"font-size: 15px;\">于2006年11月份在江苏省苏州市创立，公司注册资金5000万，经过10多年的发展与沉淀，已具有一定规模及实力，现分别在广东、江苏设立生产基地，专注于室内/户外工程照明,高杆灯,高压钠灯,太阳能庭院灯,太阳能路灯价格合理,是太阳能路灯厂家,景观灯厂家,凭借10多年的照明行业经验,在LED照明灯具节能改造等大型照明工程的光源,灯具,电器产品生产及销售!户外照明、工程照明、太阳能照明及商业照明的光源、电器、灯具、灯杆、监控杆等常规、非常规照明产品的设计、制造及安装，产品广泛应用于公共建筑、高速公路、城市主干道、乡村道路、桥梁、隧道、厂矿照明、景观照明、城市亮化、车站、机场、广场、港口码头、加油站、球场、体育场馆、植物生长、渔船灯光捕鱼、大型商场超市、品牌专卖店、酒店、小区、旅游景点等各种工程或商业领域。</span></p>',0.00,0.00,0.00,0,'',14,'[]','1641179903','master','zh','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','1',NULL,0,NULL),(10,'LED照明市场发展 民爆光电迎来行业机遇','LED照明市场发展 民爆光电迎来行业机遇','LED照明市场发展 民爆光电迎来行业机遇','随着LED照明技术的迅速发展，LED照明产品的稳定性、使用寿命、智能化、显指、光效等性能指标日趋成熟','[17]',0,'[]','<div class=\"post_body\">\n<p id=\"0HGUE56G\">随着LED照明技术的迅速发展，LED照明产品的稳定性、使用寿命、智能化、显指、光效等性能指标日趋成熟，达到满足市场需求的状态，LED照明产品已不仅仅是满足一般照明的需求，而是根据应用场景的不同，衍生出各种应用领域，市场范围不断扩展和延伸。</p>\n<p id=\"0HGUE56H\">在上世纪九十年代以前，LED照明产业处于发展前期，产品色系单一、价格较高，应用市场主要由信号灯、指示灯等需求拉动；上世纪九十年代中后期开始，LED照明产业进入快速发展阶段，蓝、绿光技术的发展与产品价格的下降使得LED照明在商用领域得到迅速推广，并成为当时LED照明市场发展的主要驱动力；随着技术的不断成熟以及价格的进一步降低，近年来LED照明产品在家居照明、工业照明等诸多领域亦逐步渗透，形成了潜力巨大的应用市场。未来，随着景观照明、汽车照明等细分行业的发展，LED照明市场需求仍将保持快速增长。</p>\n<p id=\"0HGUE56I\">深圳民爆光电股份有限公司作为专业从事LED照明灯具产品的ODM生产商，随着LED照明市场的发展，也将面临更多机遇。</p>\n</div>','<div class=\"post_body\">\n<p id=\"0HGUE56G\">随着LED照明技术的迅速发展，LED照明产品的稳定性、使用寿命、智能化、显指、光效等性能指标日趋成熟，达到满足市场需求的状态，LED照明产品已不仅仅是满足一般照明的需求，而是根据应用场景的不同，衍生出各种应用领域，市场范围不断扩展和延伸。</p>\n<p id=\"0HGUE56H\">在上世纪九十年代以前，LED照明产业处于发展前期，产品色系单一、价格较高，应用市场主要由信号灯、指示灯等需求拉动；上世纪九十年代中后期开始，LED照明产业进入快速发展阶段，蓝、绿光技术的发展与产品价格的下降使得LED照明在商用领域得到迅速推广，并成为当时LED照明市场发展的主要驱动力；随着技术的不断成熟以及价格的进一步降低，近年来LED照明产品在家居照明、工业照明等诸多领域亦逐步渗透，形成了潜力巨大的应用市场。未来，随着景观照明、汽车照明等细分行业的发展，LED照明市场需求仍将保持快速增长。</p>\n<p id=\"0HGUE56I\">深圳民爆光电股份有限公司作为专业从事LED照明灯具产品的ODM生产商，随着LED照明市场的发展，也将面临更多机遇。</p>\n</div>',0.00,0.00,0.00,0,'',17,'\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"[]\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','1641176168','master','zh','\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\"','\"[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]\"','\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\"','\"[[],[],[],[],[],[],[],[],[],[]]\"','1',NULL,0,NULL),(11,'Development of LED lighting market civil explosion optoelectronics ushers in industry opportunities','Development of LED lighting market civil explosion optoelectronics ushers in industry opportunities','Development of LED lighting market civil explosion optoelectronics ushers in industry opportunities','With the rapid development of LED lighting technology, the performance indexes of LED lighting products such as stability, service life, intelligence, finger display and light efficiency are becoming more and more mature','[17]',0,'[]','With the rapid development of LED lighting technology, the stability, service life, intelligence, finger display, light efficiency and other performance indicators of LED lighting products are becoming more and more mature to meet the market demand. LED lighting products not only meet the needs of general lighting, but also derive various application fields according to different application scenarios, and the market scope is constantly expanding and extending. Before the 1990s, the LED lighting industry was in the early stage of development, with single product color and high price. The application market was mainly driven by the demand for signal lamps and indicator lamps; Since the middle and late 1990s, the LED lighting industry has entered a stage of rapid development. The development of blue and green light technology and the decline of product prices have rapidly promoted LED lighting in the commercial field and become the main driving force for the development of LED lighting market at that time; With the continuous maturity of technology and the further reduction of price, LED lighting products have gradually penetrated into many fields such as home lighting and industrial lighting in recent years, forming a potential application market. In the future, with the development of landscape lighting, automotive lighting and other subdivided industries, the demand of LED lighting market will still maintain rapid growth. As an ODM manufacturer specializing in LED lighting products, Shenzhen civil explosion optoelectronics Co., Ltd. will also face more opportunities with the development of LED lighting market.','With the rapid development of LED lighting technology, the stability, service life, intelligence, finger display, light efficiency and other performance indicators of LED lighting products are becoming more and more mature to meet the market demand. LED lighting products not only meet the needs of general lighting, but also derive various application fields according to different application scenarios, and the market scope is constantly expanding and extending. Before the 1990s, the LED lighting industry was in the early stage of development, with single product color and high price. The application market was mainly driven by the demand for signal lamps and indicator lamps; Since the middle and late 1990s, the LED lighting industry has entered a stage of rapid development. The development of blue and green light technology and the decline of product prices have rapidly promoted LED lighting in the commercial field and become the main driving force for the development of LED lighting market at that time; With the continuous maturity of technology and the further reduction of price, LED lighting products have gradually penetrated into many fields such as home lighting and industrial lighting in recent years, forming a potential application market. In the future, with the development of landscape lighting, automotive lighting and other subdivided industries, the demand of LED lighting market will still maintain rapid growth. As an ODM manufacturer specializing in LED lighting products, Shenzhen civil explosion optoelectronics Co., Ltd. will also face more opportunities with the development of LED lighting market.',0.00,0.00,0.00,0,'',17,'\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"[]\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','1641176168','master','en','\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\"','\"[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]\"','\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\"','\"[[],[],[],[],[],[],[],[],[],[]]\"','1',NULL,0,NULL),(12,'أدى الإضاءة في السوق ، وتطوير صناعة الكهروضوئية فرصة انفجار','أدى الإضاءة في السوق ، وتطوير صناعة الكهروضوئية فرصة انفجار','أدى الإضاءة في السوق ، وتطوير صناعة الكهروضوئية فرصة انفجار','جنبا إلى جنب مع التطور السريع في تكنولوجيا الإضاءة LED ، مؤشرات الأداء مثل الاستقرار ، خدمة الحياة ، intelligentization ، عرض الاصبع ، كفاءة الضوئي من منتجات الإضاءة LED أصبحت أكثر وأكثر نضجا .','0',0,'[]','مع التطور السريع في تكنولوجيا الإضاءة LED ، والاستقرار ، خدمة الحياة ، intelligentization ، مما يدل على كفاءة الإضاءة وغيرها من مؤشرات الأداء أصبحت أكثر وأكثر نضجا لتلبية احتياجات السوق ، ومنتجات الإضاءة LED ليس فقط لتلبية احتياجات الإضاءة العامة ، ولكن وفقا لمختلف التطبيقات ، المستمدة من مجموعة متنوعة من مجالات التطبيق ، وتوسيع نطاق السوق . قبل التسعينات ، أدى الإضاءة الصناعة في مرحلة مبكرة من التنمية ، لون المنتج هو واحد ، وارتفاع الأسعار ، وذلك أساسا من خلال تطبيق السوق إشارة ، ضوء المؤشر ، وما إلى ذلك الطلب ؛ من منتصف إلى أواخر التسعينات ، أدى الإضاءة الصناعة دخلت مرحلة من مراحل التنمية السريعة ، الأزرق والأخضر تكنولوجيا الإضاءة ، وانخفاض أسعار المنتجات أدى الإضاءة في المجال التجاري قد تم الترويج لها بسرعة ، وأصبحت القوة الدافعة الرئيسية في تطوير سوق الإضاءة أدى في ذلك الوقت . مع تطور التكنولوجيا ، وانخفاض الأسعار ، ومنتجات الإضاءة LED قد توغلوا في العديد من المجالات ، مثل الإضاءة المنزلية ، والإضاءة الصناعية ، وما إلى ذلك في السنوات الأخيرة ، وشكلت إمكانات كبيرة في تطبيق السوق . في المستقبل ، جنبا إلى جنب مع تطوير صناعة الإضاءة المناظر الطبيعية ، والسيارات الإضاءة ، إضاءة LED الطلب في السوق سوف تستمر في النمو السريع . شنتشن minbao كهروضوئية المحدودة ، المحدودة المتخصصة في تصنيع التصميم الشخصي من مصابيح LED ، سوف تواجه المزيد من الفرص مع تطوير سوق الإضاءة LED .','مع التطور السريع في تكنولوجيا الإضاءة LED ، والاستقرار ، خدمة الحياة ، intelligentization ، مما يدل على كفاءة الإضاءة وغيرها من مؤشرات الأداء أصبحت أكثر وأكثر نضجا لتلبية احتياجات السوق ، ومنتجات الإضاءة LED ليس فقط لتلبية احتياجات الإضاءة العامة ، ولكن وفقا لمختلف التطبيقات ، المستمدة من مجموعة متنوعة من مجالات التطبيق ، وتوسيع نطاق السوق . قبل التسعينات ، أدى الإضاءة الصناعة في مرحلة مبكرة من التنمية ، لون المنتج هو واحد ، وارتفاع الأسعار ، وذلك أساسا من خلال تطبيق السوق إشارة ، ضوء المؤشر ، وما إلى ذلك الطلب ؛ من منتصف إلى أواخر التسعينات ، أدى الإضاءة الصناعة دخلت مرحلة من مراحل التنمية السريعة ، الأزرق والأخضر تكنولوجيا الإضاءة ، وانخفاض أسعار المنتجات أدى الإضاءة في المجال التجاري قد تم الترويج لها بسرعة ، وأصبحت القوة الدافعة الرئيسية في تطوير سوق الإضاءة أدى في ذلك الوقت . مع تطور التكنولوجيا ، وانخفاض الأسعار ، ومنتجات الإضاءة LED قد توغلوا في العديد من المجالات ، مثل الإضاءة المنزلية ، والإضاءة الصناعية ، وما إلى ذلك في السنوات الأخيرة ، وشكلت إمكانات كبيرة في تطبيق السوق . في المستقبل ، جنبا إلى جنب مع تطوير صناعة الإضاءة المناظر الطبيعية ، والسيارات الإضاءة ، إضاءة LED الطلب في السوق سوف تستمر في النمو السريع . شنتشن minbao كهروضوئية المحدودة ، المحدودة المتخصصة في تصنيع التصميم الشخصي من مصابيح LED ، سوف تواجه المزيد من الفرص مع تطوير سوق الإضاءة LED .',0.00,0.00,0.00,0,'',0,'\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"[]\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','1641176168','master','ara','\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\"','\"[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]\"','\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\"','\"[[],[],[],[],[],[],[],[],[],[]]\"','1',NULL,10,NULL),(13,'Desenvolvimento do mercado de iluminação LED explosão civil optoelectrónicos inaugura oportunidades na indústria','Desenvolvimento do mercado de iluminação LED explosão civil optoelectrónicos inaugura oportunidades na indústria','Desenvolvimento do mercado de iluminação LED explosão civil optoelectrónicos inaugura oportunidades na indústria','Com o rápido desenvolvimento da tecnologia de iluminação LED, os índices de desempenho de produtos de iluminação LED, tais como estabilidade, vida útil, inteligência, exibição de dedos e eficiência de luz estão se tornando cada vez mais maduros','0',0,'[]','Com o rápido desenvolvimento da tecnologia de iluminação LED, a estabilidade, vida de serviço, inteligência, exibição de dedos, eficiência de luz e outros indicadores de desempenho dos produtos de iluminação LED estão se tornando cada vez mais maduros para atender a demanda do mercado. Os produtos de iluminação LED não só atender às necessidades de iluminação geral, mas também derivar vários campos de aplicação de acordo com diferentes cenários de aplicação, e o escopo de mercado está constantemente se expandindo e ampliando. Antes dos anos noventa, a indústria de iluminação LED estava na fase inicial do desenvolvimento, com uma cor única do produto e um preço elevado. Desde meados e finais dos anos noventa, a indústria de iluminação LED entrou numa fase de desenvolvimento rápido. O desenvolvimento da tecnologia de luz azul e verde e o declínio dos preços do produto promoveram rapidamente a iluminação LED no campo comercial e tornaram-se a principal for ça motriz para o desenvolvimento do mercado de iluminação LED naquela época; Com o contínuo prazo de vencimento da tecnologia e a maior redução do preço, os produtos de iluminação LED penetraram gradualmente em muitos campos, como iluminação doméstica e iluminação industrial nos últimos anos, formando um mercado de aplicação potencial. No futuro, com o desenvolvimento da iluminação da paisagem, iluminação automotiva e outras indústrias subdivididas, a demanda do mercado de iluminação LED ainda vai manter o crescimento rápido. Como um fabricante de ODM especializado em produtos de iluminação LED, Shenzhen civil blast optoelectronics Co., Ltd. também vai enfrentar mais oportunidades com o desenvolvimento do mercado de iluminação LED.','Com o rápido desenvolvimento da tecnologia de iluminação LED, a estabilidade, vida de serviço, inteligência, exibição de dedos, eficiência de luz e outros indicadores de desempenho dos produtos de iluminação LED estão se tornando cada vez mais maduros para atender a demanda do mercado. Os produtos de iluminação LED não só atender às necessidades de iluminação geral, mas também derivar vários campos de aplicação de acordo com diferentes cenários de aplicação, e o escopo de mercado está constantemente se expandindo e ampliando. Antes dos anos noventa, a indústria de iluminação LED estava na fase inicial do desenvolvimento, com uma cor única do produto e um preço elevado. Desde meados e finais dos anos noventa, a indústria de iluminação LED entrou numa fase de desenvolvimento rápido. O desenvolvimento da tecnologia de luz azul e verde e o declínio dos preços do produto promoveram rapidamente a iluminação LED no campo comercial e tornaram-se a principal for ça motriz para o desenvolvimento do mercado de iluminação LED naquela época; Com o contínuo prazo de vencimento da tecnologia e a maior redução do preço, os produtos de iluminação LED penetraram gradualmente em muitos campos, como iluminação doméstica e iluminação industrial nos últimos anos, formando um mercado de aplicação potencial. No futuro, com o desenvolvimento da iluminação da paisagem, iluminação automotiva e outras indústrias subdivididas, a demanda do mercado de iluminação LED ainda vai manter o crescimento rápido. Como um fabricante de ODM especializado em produtos de iluminação LED, Shenzhen civil blast optoelectronics Co., Ltd. também vai enfrentar mais oportunidades com o desenvolvimento do mercado de iluminação LED.',0.00,0.00,0.00,0,'',0,'\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"[]\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','1641176168','master','pt','\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\"','\"[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]\"','\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\"','\"[[],[],[],[],[],[],[],[],[],[]]\"','1',NULL,10,NULL),(14,'Desarrollo del mercado de iluminación LED','Desarrollo del mercado de iluminación LED','Desarrollo del mercado de iluminación LED','Con el rápido desarrollo de la tecnología de iluminación LED, la estabilidad, la vida útil, la inteligencia, la indicación y la eficiencia de la luz de los productos de iluminación LED están madurando.','0',0,'[]','Con el rápido desarrollo de la tecnología de iluminación LED, los indicadores de rendimiento de los productos de iluminación LED, como la estabilidad, la vida útil, la inteligencia, la indicación y la eficiencia de la luz, están madurando día a día, alcanzando el Estado de satisfacer las necesidades del mercado. Los productos de iluminación LED no Sólo satisfacen las necesidades de iluminación general, sino que también desarrollan una variedad de campos de aplicación de acuerdo con diferentes escenarios de aplicación, y el alcance del mercado se amplía y amplía continuamente. Antes de la década de 1990, la industria de la iluminación LED se encontraba en la fase inicial de desarrollo, el color de los productos era único, el precio era alto, el mercado de aplicaciones estaba impulsado principalmente por la demanda de luces de señal, luces indicadoras, etc. Desde mediados y finales de la década de 1990, la industria de la iluminación LED ha entrado en una fase de rápido desarrollo, el desarrollo de la tecnología de la luz azul y verde y la disminución de los precios de los productos hacen que la iluminación LED se extienda rápidamente en el campo comercial y se convierta en la principal fuerza impulsora del desarrollo del mercado de la iluminación LED en ese momento. Con el desarrollo de la tecnología y la disminución de los precios, los productos de iluminación LED han penetrado gradualmente en muchos campos, como la iluminación doméstica, la iluminación industrial, etc. En el futuro, con el desarrollo de la iluminación paisajística y la Iluminación automotriz, la demanda del mercado de iluminación LED seguirá creciendo rápidamente. Shenzhen minblast Optoelectronics Co., Ltd. Como fabricante profesional de lámparas LED ODM, con el desarrollo del mercado de iluminación LED, también se enfrentará a más oportunidades.','Con el rápido desarrollo de la tecnología de iluminación LED, los indicadores de rendimiento de los productos de iluminación LED, como la estabilidad, la vida útil, la inteligencia, la indicación y la eficiencia de la luz, están madurando día a día, alcanzando el Estado de satisfacer las necesidades del mercado. Los productos de iluminación LED no Sólo satisfacen las necesidades de iluminación general, sino que también desarrollan una variedad de campos de aplicación de acuerdo con diferentes escenarios de aplicación, y el alcance del mercado se amplía y amplía continuamente. Antes de la década de 1990, la industria de la iluminación LED se encontraba en la fase inicial de desarrollo, el color de los productos era único, el precio era alto, el mercado de aplicaciones estaba impulsado principalmente por la demanda de luces de señal, luces indicadoras, etc. Desde mediados y finales de la década de 1990, la industria de la iluminación LED ha entrado en una fase de rápido desarrollo, el desarrollo de la tecnología de la luz azul y verde y la disminución de los precios de los productos hacen que la iluminación LED se extienda rápidamente en el campo comercial y se convierta en la principal fuerza impulsora del desarrollo del mercado de la iluminación LED en ese momento. Con el desarrollo de la tecnología y la disminución de los precios, los productos de iluminación LED han penetrado gradualmente en muchos campos, como la iluminación doméstica, la iluminación industrial, etc. En el futuro, con el desarrollo de la iluminación paisajística y la Iluminación automotriz, la demanda del mercado de iluminación LED seguirá creciendo rápidamente. Shenzhen minblast Optoelectronics Co., Ltd. Como fabricante profesional de lámparas LED ODM, con el desarrollo del mercado de iluminación LED, también se enfrentará a más oportunidades.',0.00,0.00,0.00,0,'',0,'\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"[]\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','1641176168','master','spa','\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\"','\"[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]\"','\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\"','\"[[],[],[],[],[],[],[],[],[],[]]\"','1',NULL,10,NULL),(15,'Entwicklung des LED-Beleuchtungsmarktes zivile Explosion optoelektronische Platzhalter in der Industrie','Entwicklung des LED-Beleuchtungsmarktes zivile Explosion optoelektronische Platzhalter in der Industrie','Entwicklung des LED-Beleuchtungsmarktes zivile Explosion optoelektronische Platzhalter in der Industrie','Mit der rasanten Entwicklung der LED-Beleuchtungstechnik werden die Leistungsindizes von LED-Beleuchtungsprodukten wie Stabilität, Lebensdauer, Intelligenz, Fingeranzeige und Lichteffizienz immer ausgereifter','0',0,'[]','Mit der rasanten Entwicklung der LED-Beleuchtungstechnik werden die Stabilität, Lebensdauer, Intelligenz, Fingeranzeige, Lichteffizienz und andere Leistungsindikatoren von LED-Beleuchtungsprodukten immer ausgereifter, um dem Bedarf des Marktes gerecht zu werden. LED-Beleuchtungsprodukte erfüllen nicht nur die Anforderungen der allgemeinen Beleuchtung, sondern leiten auch verschiedene Anwendungsbereiche nach unterschiedlichen Anwendungsszenarien ab und der Markt erweitert sich ständig. Vor den 90er Jahren befand sich die LED-Beleuchtungsindustrie in der frühen Entwicklungsphase, mit einer einzigen Produktfarbe und hohem Preis. Der Anwendungsmarkt wurde vor allem durch die Nachfrage nach Signallampen und Indikatorlampen angetrieben. Seit Mitte und Ende der 90er Jahre ist die LED-Beleuchtungsindustrie in eine Phase der rasanten Entwicklung eingetreten. Die Entwicklung der blauen und grünen Lichttechnik und der Rückgang der Produktpreise haben die LED-Beleuchtung im kommerziellen Bereich schnell gefördert und zu der wichtigsten Antriebskraft für die Entwicklung des LED-Beleuchtungsmarktes zu dieser Zeit geworden; Mit der kontinuierlichen Reife der Technik und der weiteren Senkung der Preise sind LED-Beleuchtungsprodukte in den letzten Jahren nach und nach in viele Bereiche wie Hausbeleuchtung und Industriebeleuchtung eingedrungen und bilden einen potenziellen Anwendungsmarkt. In Zukunft wird mit der Entwicklung von Landschaftsbeleuchtung, Automobilbeleuchtung und anderen Teilbranchen die Nachfrage nach LED-Beleuchtungsmarkt nach wie vor ein schnelles Wachstum erhalten. Als ODM-Hersteller, der auf LED-Beleuchtungsprodukte spezialisiert ist, wird Shenzhen zivile Explosion optoelectronics Co., Ltd. auch mit der Entwicklung des LED-Beleuchtungsmarktes mehr Chancen haben.','Mit der rasanten Entwicklung der LED-Beleuchtungstechnik werden die Stabilität, Lebensdauer, Intelligenz, Fingeranzeige, Lichteffizienz und andere Leistungsindikatoren von LED-Beleuchtungsprodukten immer ausgereifter, um dem Bedarf des Marktes gerecht zu werden. LED-Beleuchtungsprodukte erfüllen nicht nur die Anforderungen der allgemeinen Beleuchtung, sondern leiten auch verschiedene Anwendungsbereiche nach unterschiedlichen Anwendungsszenarien ab und der Markt erweitert sich ständig. Vor den 90er Jahren befand sich die LED-Beleuchtungsindustrie in der frühen Entwicklungsphase, mit einer einzigen Produktfarbe und hohem Preis. Der Anwendungsmarkt wurde vor allem durch die Nachfrage nach Signallampen und Indikatorlampen angetrieben. Seit Mitte und Ende der 90er Jahre ist die LED-Beleuchtungsindustrie in eine Phase der rasanten Entwicklung eingetreten. Die Entwicklung der blauen und grünen Lichttechnik und der Rückgang der Produktpreise haben die LED-Beleuchtung im kommerziellen Bereich schnell gefördert und zu der wichtigsten Antriebskraft für die Entwicklung des LED-Beleuchtungsmarktes zu dieser Zeit geworden; Mit der kontinuierlichen Reife der Technik und der weiteren Senkung der Preise sind LED-Beleuchtungsprodukte in den letzten Jahren nach und nach in viele Bereiche wie Hausbeleuchtung und Industriebeleuchtung eingedrungen und bilden einen potenziellen Anwendungsmarkt. In Zukunft wird mit der Entwicklung von Landschaftsbeleuchtung, Automobilbeleuchtung und anderen Teilbranchen die Nachfrage nach LED-Beleuchtungsmarkt nach wie vor ein schnelles Wachstum erhalten. Als ODM-Hersteller, der auf LED-Beleuchtungsprodukte spezialisiert ist, wird Shenzhen zivile Explosion optoelectronics Co., Ltd. auch mit der Entwicklung des LED-Beleuchtungsmarktes mehr Chancen haben.',0.00,0.00,0.00,0,'',0,'\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"[]\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','1641176168','master','de','\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\"','\"[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]\"','\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\"','\"[[],[],[],[],[],[],[],[],[],[]]\"','1',NULL,10,NULL),(16,'LED освещение рынка развитие народного взрыва','LED освещение рынка развитие народного взрыва','LED освещение рынка развитие народного взрыва','с быстрым развитием технологии светодиодного освещения светодиодные индикаторы устойчивости, жизненного цикла, интеллекта, заметности, светового эффекта и т.д.','0',0,'[]','с быстрым развитием технологии освещения LED, такие показатели производительности, как стабильность светодиодной продукции, срок службы, интеллектуализация, заметность и световые эффекты, становятся все более зрелыми, чтобы удовлетворить рыночный спрос, светодиодный светодиодный продукт уже не только удовлетворяет потребности в освещении в целом, но и развивается и расширяется в зависимости от различных сценариев применения. до 90 - х годов прошлого века светодиодная отрасль находилась в стадии развития, продукция имеет монохромный цвет и высокую цену, и рынок прикладных услуг в основном определялся спросом на Сигнальные лампы, лампы - индикаторы и т.д.; Начиная с середины 90 - х годов, отрасль освещения LED вступила в этап быстрого развития, в результате чего развитие технологии \"голубой\" и \"зеленой\" светофоры и снижение цен на продукцию привели к быстрому распространению светодиодного освещения в коммерческих целях и стали главной движущей силой развития рынка освещения LED в то время; по мере развития технологии и дальнейшего снижения цен светодиодные продукты в последние годы постепенно проникают в такие сферы, как освещение дома, промышленное освещение, что создает огромный потенциал для использования на рынке. в будущем спрос на Светодиодное освещение на рынке будет расти быстрыми темпами по мере развития таких секторов, как ландшафтное освещение, автомобильное освещение и т.д. Шэньчжэньская компания по производству фотоэлектрических и фотоэлектрических приборов, специализирующаяся на производстве светодиодных ламп, также столкнется с дополнительными возможностями по мере развития рынка светодиодов.','с быстрым развитием технологии освещения LED, такие показатели производительности, как стабильность светодиодной продукции, срок службы, интеллектуализация, заметность и световые эффекты, становятся все более зрелыми, чтобы удовлетворить рыночный спрос, светодиодный светодиодный продукт уже не только удовлетворяет потребности в освещении в целом, но и развивается и расширяется в зависимости от различных сценариев применения. до 90 - х годов прошлого века светодиодная отрасль находилась в стадии развития, продукция имеет монохромный цвет и высокую цену, и рынок прикладных услуг в основном определялся спросом на Сигнальные лампы, лампы - индикаторы и т.д.; Начиная с середины 90 - х годов, отрасль освещения LED вступила в этап быстрого развития, в результате чего развитие технологии \"голубой\" и \"зеленой\" светофоры и снижение цен на продукцию привели к быстрому распространению светодиодного освещения в коммерческих целях и стали главной движущей силой развития рынка освещения LED в то время; по мере развития технологии и дальнейшего снижения цен светодиодные продукты в последние годы постепенно проникают в такие сферы, как освещение дома, промышленное освещение, что создает огромный потенциал для использования на рынке. в будущем спрос на Светодиодное освещение на рынке будет расти быстрыми темпами по мере развития таких секторов, как ландшафтное освещение, автомобильное освещение и т.д. Шэньчжэньская компания по производству фотоэлектрических и фотоэлектрических приборов, специализирующаяся на производстве светодиодных ламп, также столкнется с дополнительными возможностями по мере развития рынка светодиодов.',0.00,0.00,0.00,0,'',0,'\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"[]\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','1641176168','master','ru','\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\"','\"[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]\"','\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\"','\"[[],[],[],[],[],[],[],[],[],[]]\"','1',NULL,10,NULL),(17,'Suzhou haoancheng Lighting Engineering Co., Ltd','Suzhou haoancheng Lighting Engineering Co., Ltd','Suzhou haoancheng Lighting Engineering Co., Ltd','Suzhou haoancheng Lighting Engineering Co., Ltd','0',0,'[]','Founded in Suzhou, Jiangsu Province in November 2006, the company has a registered capital of 50 million. After more than 10 years of development and precipitation, it has a certain scale and strength. Now it has set up production bases in Guangdong and Jiangsu respectively, focusing on indoor / outdoor engineering lighting, high pole lamp, high-pressure sodium lamp, solar garden lamp and solar street lamp. The price is reasonable. It is a solar street lamp manufacturer and landscape lamp manufacturer, With more than 10 years of experience in the lighting industry, we are engaged in the production and sales of light sources, lamps and electrical products for large-scale lighting projects such as energy-saving transformation of LED lighting lamps! Design, manufacture and installation of conventional and unconventional lighting products such as light sources, electrical appliances, lamps, lamp poles and monitoring poles for outdoor lighting, engineering lighting, solar lighting and commercial lighting. The products are widely used in public buildings, expressways, urban trunk roads, rural roads, bridges, tunnels, factory and mine lighting, landscape lighting, urban lighting, stations, airports, squares Ports and docks, gas stations, stadiums, stadiums, plant growth, fishing boats, light fishing, large shopping malls, supermarkets, brand stores, hotels, communities, tourist attractions and other engineering or commercial fields.','Founded in Suzhou, Jiangsu Province in November 2006, the company has a registered capital of 50 million. After more than 10 years of development and precipitation, it has a certain scale and strength. Now it has set up production bases in Guangdong and Jiangsu respectively, focusing on indoor / outdoor engineering lighting, high pole lamp, high-pressure sodium lamp, solar garden lamp and solar street lamp. The price is reasonable. It is a solar street lamp manufacturer and landscape lamp manufacturer, With more than 10 years of experience in the lighting industry, we are engaged in the production and sales of light sources, lamps and electrical products for large-scale lighting projects such as energy-saving transformation of LED lighting lamps! Design, manufacture and installation of conventional and unconventional lighting products such as light sources, electrical appliances, lamps, lamp poles and monitoring poles for outdoor lighting, engineering lighting, solar lighting and commercial lighting. The products are widely used in public buildings, expressways, urban trunk roads, rural roads, bridges, tunnels, factory and mine lighting, landscape lighting, urban lighting, stations, airports, squares Ports and docks, gas stations, stadiums, stadiums, plant growth, fishing boats, light fishing, large shopping malls, supermarkets, brand stores, hotels, communities, tourist attractions and other engineering or commercial fields.',0.00,0.00,0.00,0,'',7,'[]','1641179903','master','en','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','1',NULL,7,NULL),(18,'سوتشو haoancheng الإضاءة الهندسية المحدودة','سوتشو haoancheng الإضاءة الهندسية المحدودة','سوتشو haoancheng الإضاءة الهندسية المحدودة','سوتشو haoancheng الإضاءة الهندسية المحدودة','0',0,'[]','تأسست في تشرين الثاني / نوفمبر 2006 في مدينة سوتشو بمقاطعة جيانغسو ، رأس المال المسجل من 50 مليون دولار ، بعد 10 سنوات من التنمية هطول الأمطار ، لديها حجم معين وقوة ، هي الآن على التوالي في قوانغدونغ وجيانغسو إنشاء قواعد الانتاج ، والتركيز على المشاريع في الأماكن المغلقة / في الهواء الطلق الإضاءة ، وارتفاع القطب مصباح ، مصباح الصوديوم الضغط العالي ، والطاقة الشمسية حديقة مصباح ، مصباح الشارع الشمسية بأسعار معقولة ، والطاقة الشمسية مصباح الشارع ، مصباح المناظر الطبيعية المصنعة ، مع أكثر من 10 عاما من الخبرة في مجال صناعة الإضاءة ، ومصابيح LED في توفير الطاقة وإعادة بناء مشاريع الإضاءة الكبيرة مثل مصادر الضوء ، والمصابيح والفوانيس ، وإنتاج وتسويق المنتجات الكهربائية ! في الهواء الطلق الإضاءة ، الإضاءة الهندسية ، والطاقة الشمسية الإضاءة التجارية ، مصدر الضوء ، والأجهزة الكهربائية ، والمصابيح والفوانيس ، مصباح القطب ، القطب الرصد وغيرها من التقليدية وغير التقليدية ومنتجات الإضاءة تصميم وتصنيع وتركيب ، وتستخدم على نطاق واسع في المباني العامة ، والطرق السريعة ، الطرق الحضرية الرئيسية ، الطرق الريفية ، والجسور ، والأنفاق ، والمصانع والمناظر الطبيعية الإضاءة ، الإضاءة في المناطق الحضرية ، ومحطات السكك الحديدية والمطارات والساحات الميناء ، ومحطات الغاز ، والملاعب ، والملاعب الرياضية ، نمو النباتات ، قوارب الصيد ، ومصائد الأسماك ، ومراكز التسوق الكبيرة ، محلات تجارية ، والفنادق ، والأحياء ، ومناطق الجذب السياحي ، وغيرها من المشاريع أو المجالات التجارية .','تأسست في تشرين الثاني / نوفمبر 2006 في مدينة سوتشو بمقاطعة جيانغسو ، رأس المال المسجل من 50 مليون دولار ، بعد 10 سنوات من التنمية هطول الأمطار ، لديها حجم معين وقوة ، هي الآن على التوالي في قوانغدونغ وجيانغسو إنشاء قواعد الانتاج ، والتركيز على المشاريع في الأماكن المغلقة / في الهواء الطلق الإضاءة ، وارتفاع القطب مصباح ، مصباح الصوديوم الضغط العالي ، والطاقة الشمسية حديقة مصباح ، مصباح الشارع الشمسية بأسعار معقولة ، والطاقة الشمسية مصباح الشارع ، مصباح المناظر الطبيعية المصنعة ، مع أكثر من 10 عاما من الخبرة في مجال صناعة الإضاءة ، ومصابيح LED في توفير الطاقة وإعادة بناء مشاريع الإضاءة الكبيرة مثل مصادر الضوء ، والمصابيح والفوانيس ، وإنتاج وتسويق المنتجات الكهربائية ! في الهواء الطلق الإضاءة ، الإضاءة الهندسية ، والطاقة الشمسية الإضاءة التجارية ، مصدر الضوء ، والأجهزة الكهربائية ، والمصابيح والفوانيس ، مصباح القطب ، القطب الرصد وغيرها من التقليدية وغير التقليدية ومنتجات الإضاءة تصميم وتصنيع وتركيب ، وتستخدم على نطاق واسع في المباني العامة ، والطرق السريعة ، الطرق الحضرية الرئيسية ، الطرق الريفية ، والجسور ، والأنفاق ، والمصانع والمناظر الطبيعية الإضاءة ، الإضاءة في المناطق الحضرية ، ومحطات السكك الحديدية والمطارات والساحات الميناء ، ومحطات الغاز ، والملاعب ، والملاعب الرياضية ، نمو النباتات ، قوارب الصيد ، ومصائد الأسماك ، ومراكز التسوق الكبيرة ، محلات تجارية ، والفنادق ، والأحياء ، ومناطق الجذب السياحي ، وغيرها من المشاريع أو المجالات التجارية .',0.00,0.00,0.00,0,'',7,'[]','1641179903','master','ara','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','1',NULL,7,NULL),(19,'Suzhou haoancheng Lighting Engineering Co., Ltd.','Suzhou haoancheng Lighting Engineering Co., Ltd.','Suzhou haoancheng Lighting Engineering Co., Ltd.','Suzhou haoancheng Lighting Engineering Co., Ltd.','0',0,'[]','Fundada em Suzhou, Província de Jiangsu em novembro 2006, a empresa tem uma capital registrada de cinquenta milhões. Depois de mais de dez anos de desenvolvimento e precipitação, ela tem uma certa escala e força. Agora, ela tem criado bases de produção em Guangdong e Jiangsu respectivamente, focando em iluminação interior / exterior, lâmpada de alto polo, lâmpada de alta pressão de sódio, luz de jardim solar e luz de rua solar. O preço é razoável. É um fabricante de luz solar de rua e de paisagem, Com mais de dez anos de experiência na indústria de iluminação, estamos envolvidos na produção e venda de fontes de luz, lâmpadas e produtos elétricos para projetos de iluminação em grande escala, como a transformação de energia economizadora de lâmpadas LED! Concepção, fabrico e instalação de produtos de iluminação convencionais e não convencionais, tais como fontes luminosas, aparelhos eléctricos, lâmpadas, postes de iluminação e postes de monitorização para iluminação ao ar livre, iluminação de engenharia, iluminação solar e iluminação comercial. Os produtos são amplamente utilizados em edifícios públicos, vias-mestras, estradas urban as, estradas rurais, pontes, túneis, iluminação de fábrica e minas, iluminação urbana, estações, aeroportos, praças Portos e docas, postos de gás, estádios, estádios, crescimento de plantas, barcos de pesca, pesca leve, grandes centros comerciais, supermercados, lojas de marca, hotéis, comunidades, atracções turísticas e outros campos de engenharia ou comercial.','Fundada em Suzhou, Província de Jiangsu em novembro 2006, a empresa tem uma capital registrada de cinquenta milhões. Depois de mais de dez anos de desenvolvimento e precipitação, ela tem uma certa escala e força. Agora, ela tem criado bases de produção em Guangdong e Jiangsu respectivamente, focando em iluminação interior / exterior, lâmpada de alto polo, lâmpada de alta pressão de sódio, luz de jardim solar e luz de rua solar. O preço é razoável. É um fabricante de luz solar de rua e de paisagem, Com mais de dez anos de experiência na indústria de iluminação, estamos envolvidos na produção e venda de fontes de luz, lâmpadas e produtos elétricos para projetos de iluminação em grande escala, como a transformação de energia economizadora de lâmpadas LED! Concepção, fabrico e instalação de produtos de iluminação convencionais e não convencionais, tais como fontes luminosas, aparelhos eléctricos, lâmpadas, postes de iluminação e postes de monitorização para iluminação ao ar livre, iluminação de engenharia, iluminação solar e iluminação comercial. Os produtos são amplamente utilizados em edifícios públicos, vias-mestras, estradas urban as, estradas rurais, pontes, túneis, iluminação de fábrica e minas, iluminação urbana, estações, aeroportos, praças Portos e docas, postos de gás, estádios, estádios, crescimento de plantas, barcos de pesca, pesca leve, grandes centros comerciais, supermercados, lojas de marca, hotéis, comunidades, atracções turísticas e outros campos de engenharia ou comercial.',0.00,0.00,0.00,0,'',7,'[]','1641179903','master','pt','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','1',NULL,7,NULL),(20,'Suzhou haoancheng Lighting Engineering Co., Ltd.','Suzhou haoancheng Lighting Engineering Co., Ltd.','Suzhou haoancheng Lighting Engineering Co., Ltd.','Suzhou haoancheng Lighting Engineering Co., Ltd.','0',0,'[]','Fundada en la ciudad de Suzhou, Provincia de Jiangsu, en noviembre de 2006, con un capital registrado de 50 millones de yuan, después de más de 10 a ños de desarrollo y asentamiento, tiene una cierta escala y fuerza, ahora se establecen bases de producción en Guangdong y Jiangsu, respectivamente, centrándose en la iluminación Interior / exterior de ingeniería, lámparas de poste alto, lámparas de sodio de alta presión, lámparas solares de patio, lámparas solares de calle a precios razonables, son fabricantes de lámparas solares de calle, fabricantes de lámparas paisajísticas, ¡Con más de 10 años de experiencia en la industria de la iluminación, la iluminación LED en la transformación de ahorro de energía y otros proyectos de iluminación a gran escala de fuentes de luz, lámparas, productos eléctricos de producción y ventas! Diseño, fabricación e instalación de productos de iluminación convencionales y no convencionales, como iluminación exterior, iluminación de ingeniería, iluminación solar e iluminación comercial, aparatos eléctricos, lámparas, postes de luz, postes de monitoreo, etc. los productos se utilizan ampliamente en edificios públicos, autopistas, carreteras principales urbanas, carreteras rurales, puentes, túneles, iluminación de fábricas y minas, iluminación paisajística, iluminación urbana, estaciones, aeropuertos, plazas, Puertos, gasolineras, campos, estadios, crecimiento de plantas, pesca de iluminación de barcos de pesca, supermercados, tiendas de marca, hoteles, zonas residenciales, atracciones turísticas y otros campos de ingeniería o negocios.','Fundada en la ciudad de Suzhou, Provincia de Jiangsu, en noviembre de 2006, con un capital registrado de 50 millones de yuan, después de más de 10 a ños de desarrollo y asentamiento, tiene una cierta escala y fuerza, ahora se establecen bases de producción en Guangdong y Jiangsu, respectivamente, centrándose en la iluminación Interior / exterior de ingeniería, lámparas de poste alto, lámparas de sodio de alta presión, lámparas solares de patio, lámparas solares de calle a precios razonables, son fabricantes de lámparas solares de calle, fabricantes de lámparas paisajísticas, ¡Con más de 10 años de experiencia en la industria de la iluminación, la iluminación LED en la transformación de ahorro de energía y otros proyectos de iluminación a gran escala de fuentes de luz, lámparas, productos eléctricos de producción y ventas! Diseño, fabricación e instalación de productos de iluminación convencionales y no convencionales, como iluminación exterior, iluminación de ingeniería, iluminación solar e iluminación comercial, aparatos eléctricos, lámparas, postes de luz, postes de monitoreo, etc. los productos se utilizan ampliamente en edificios públicos, autopistas, carreteras principales urbanas, carreteras rurales, puentes, túneles, iluminación de fábricas y minas, iluminación paisajística, iluminación urbana, estaciones, aeropuertos, plazas, Puertos, gasolineras, campos, estadios, crecimiento de plantas, pesca de iluminación de barcos de pesca, supermercados, tiendas de marca, hoteles, zonas residenciales, atracciones turísticas y otros campos de ingeniería o negocios.',0.00,0.00,0.00,0,'',7,'[]','1641179903','master','spa','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','1',NULL,7,NULL),(21,'Suzhou haoancheng Lighting Engineering Co., Ltd.','Suzhou haoancheng Lighting Engineering Co., Ltd.','Suzhou haoancheng Lighting Engineering Co., Ltd.','Suzhou haoancheng Lighting Engineering Co., Ltd.','0',0,'[]','Gegründet in Suzhou, Provinz Jiangsu im November 2006, hat das Unternehmen ein eingetragenes Kapital von 50 Millionen. Nach mehr als zehn Jahren der Entwicklung und Niederschlag, hat es eine bestimmte Skala und Stärke. Jetzt hat es Produktionsstätten in Guangdong und Jiangsu, fokussiert auf Indoor /Outdoor-Engineering-Beleuchtung, Hochpollampe, Hochdruck-Natriumlampe, Solargarten-Lampe und Sonnen-Straßenlampe. Der Preis ist angemessen. Es ist ein Solarstraßenlampenhersteller und Landschaftslampenhersteller, Mit mehr als 10-jähriger Erfahrung in der Beleuchtungsindustrie beschäftigen wir uns mit der Produktion und dem Vertrieb von Lichtquellen, Lampen und Elektroprodukten für großflächige Beleuchtungsprojekte wie energiesparende Transformation von LED-Beleuchtungslampen! Design, Herstellung und Installation von konventionellen und unkonventionellen Beleuchtungsprodukten wie Lichtquellen, Elektrogeräte, Lampen, Lampenmasten und Monitoringpolen für Außenbeleuchtung, Ingenieurbeleuchtung, Solarbeleuchtung und kommerzielle Beleuchtung. Die Produkte sind weit verbreitet in öffentlichen Gebäuden, Schnellstraßen, städtischen Hauptstraßen, ländlichen Straßen, Brücken, Tunneln, Fabrik- und Minenbeleuchtung, Landschaftsbeleuchtung, städtischen Beleuchtung, Bahnhöfen, Flughäfen, Plätze Häfen und Docks, Tankstellen, Stadien, Stadien, Pflanzenwachstum, Fischerboote, leichte Fischerei, große Einkaufszentren, Supermärkte, Marken-Läden, Hotels, Gemeinden, Touristenattraktionen und andere technische oder kommerzielle Bereiche.','Gegründet in Suzhou, Provinz Jiangsu im November 2006, hat das Unternehmen ein eingetragenes Kapital von 50 Millionen. Nach mehr als zehn Jahren der Entwicklung und Niederschlag, hat es eine bestimmte Skala und Stärke. Jetzt hat es Produktionsstätten in Guangdong und Jiangsu, fokussiert auf Indoor /Outdoor-Engineering-Beleuchtung, Hochpollampe, Hochdruck-Natriumlampe, Solargarten-Lampe und Sonnen-Straßenlampe. Der Preis ist angemessen. Es ist ein Solarstraßenlampenhersteller und Landschaftslampenhersteller, Mit mehr als 10-jähriger Erfahrung in der Beleuchtungsindustrie beschäftigen wir uns mit der Produktion und dem Vertrieb von Lichtquellen, Lampen und Elektroprodukten für großflächige Beleuchtungsprojekte wie energiesparende Transformation von LED-Beleuchtungslampen! Design, Herstellung und Installation von konventionellen und unkonventionellen Beleuchtungsprodukten wie Lichtquellen, Elektrogeräte, Lampen, Lampenmasten und Monitoringpolen für Außenbeleuchtung, Ingenieurbeleuchtung, Solarbeleuchtung und kommerzielle Beleuchtung. Die Produkte sind weit verbreitet in öffentlichen Gebäuden, Schnellstraßen, städtischen Hauptstraßen, ländlichen Straßen, Brücken, Tunneln, Fabrik- und Minenbeleuchtung, Landschaftsbeleuchtung, städtischen Beleuchtung, Bahnhöfen, Flughäfen, Plätze Häfen und Docks, Tankstellen, Stadien, Stadien, Pflanzenwachstum, Fischerboote, leichte Fischerei, große Einkaufszentren, Supermärkte, Marken-Läden, Hotels, Gemeinden, Touristenattraktionen und andere technische oder kommerzielle Bereiche.',0.00,0.00,0.00,0,'',8,'[]','1641179903','master','de','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','1',NULL,7,NULL),(22,'ооо \"сучжоу хаоанчэн светильник инжиниринг\"','ооо \"сучжоу хаоанчэн светильник инжиниринг\"','ооо \"сучжоу хаоанчэн светильник инжиниринг\"','ооо \"сучжоу хаоанчэн светильник инжиниринг\"','0',0,'[]','созданный в ноябре 2006 года в городе сучжоу, провинция цзянсу, компания зарегистрирована на 50 миллионов, после более чем 10 лет развития и осаждения, имеет определенный размер и мощность, в настоящее время в Гуандуне и цзянсу, соответственно, производственные базы, сосредоточены на внутреннем / внешнем инженерном освещении, высокая мачта, натриевые лампы высокого давления, солнечный сад, солнечная уличная лампа разумная цена, является производителем солнечных уличных ламп, ландшафтных ламп производителей, Опираясь на опыт более чем 10 лет осветительной промышленности, светодиодные лампы, энергосберегающие приспособления и другие крупные осветительные работы, такие как производство и продажа осветительных приборов! наружное освещение, инженерное освещение, солнечное освещение и коммерческое освещение источников света, электроприборов, ламп, ламп, контрольная мачта и другие обычные, нетипичные осветительные продукты проектирования, производства и монтажа, продукты широко применяются в общественных зданиях, автострадах, городских магистралях, сельских дорог, мостов, туннелей, промышленного освещения, ландшафтного освещения, городского освещения, станций, аэропортов, площадей, портовые Пирсы, бензоколонки, корты, стадионы, растительный рост, рыболовецкая световая ловля, большой супермаркет, фирменный магазин, отели, микрорайон, туристические достопримечательности ит.д.','созданный в ноябре 2006 года в городе сучжоу, провинция цзянсу, компания зарегистрирована на 50 миллионов, после более чем 10 лет развития и осаждения, имеет определенный размер и мощность, в настоящее время в Гуандуне и цзянсу, соответственно, производственные базы, сосредоточены на внутреннем / внешнем инженерном освещении, высокая мачта, натриевые лампы высокого давления, солнечный сад, солнечная уличная лампа разумная цена, является производителем солнечных уличных ламп, ландшафтных ламп производителей, Опираясь на опыт более чем 10 лет осветительной промышленности, светодиодные лампы, энергосберегающие приспособления и другие крупные осветительные работы, такие как производство и продажа осветительных приборов! наружное освещение, инженерное освещение, солнечное освещение и коммерческое освещение источников света, электроприборов, ламп, ламп, контрольная мачта и другие обычные, нетипичные осветительные продукты проектирования, производства и монтажа, продукты широко применяются в общественных зданиях, автострадах, городских магистралях, сельских дорог, мостов, туннелей, промышленного освещения, ландшафтного освещения, городского освещения, станций, аэропортов, площадей, портовые Пирсы, бензоколонки, корты, стадионы, растительный рост, рыболовецкая световая ловля, большой супермаркет, фирменный магазин, отели, микрорайон, туристические достопримечательности ит.д.',0.00,0.00,0.00,0,'',7,'[]','1641179903','master','ru','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[[],[],[],[],[],[],[],[],[],[]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"\\\"\"','1',NULL,7,NULL);
/*!40000 ALTER TABLE `erdai_news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_news_attribute`
--

DROP TABLE IF EXISTS `erdai_news_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_news_attribute` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `time` varchar(20) DEFAULT NULL,
  `admin_user` varchar(20) DEFAULT NULL,
  `lang` varchar(10) DEFAULT NULL,
  `weight` int(5) DEFAULT '100',
  `name` varchar(200) DEFAULT NULL,
  `shuxing` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_news_attribute`
--

LOCK TABLES `erdai_news_attribute` WRITE;
/*!40000 ALTER TABLE `erdai_news_attribute` DISABLE KEYS */;
INSERT INTO `erdai_news_attribute` VALUES (2,'1636163248','master','zh',0,'色系','[{\"name\":\"\\u989c\\u8272\",\"value\":\"\\u7ea2\\n\\u9ec4\\n\\u84dd\",\"type\":\"1\",\"weight\":\"0\"},{\"name\":\"\\u5927\\u5c0f\",\"value\":\"\\u5c0f\\n\\u4e2d\\n\\u5927\",\"type\":\"2\",\"weight\":\"4\"}]'),(3,'1636163301','master','zh',0,'型号','[{\"name\":\"\\u578b\\u53f7\",\"value\":\"88\\n99\\n11\\nxx\\nzz\",\"type\":\"1\",\"weight\":\"\"}]'),(5,'1636188237','master','zh',0,'安装说明','[{\"name\":\"\\u5b89\\u88c5\\u8bf4\\u660e\",\"value\":\"\",\"type\":\"3\",\"weight\":\"5\"}]');
/*!40000 ALTER TABLE `erdai_news_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_news_classify`
--

DROP TABLE IF EXISTS `erdai_news_classify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_news_classify` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(220) DEFAULT NULL,
  `seo_title` varchar(220) DEFAULT NULL,
  `keyword` varchar(220) DEFAULT NULL,
  `description` varchar(240) DEFAULT NULL,
  `parent` int(5) DEFAULT '0' COMMENT '上级分类',
  `weight` int(5) DEFAULT '0',
  `admin_user` varchar(30) DEFAULT '0',
  `time` int(12) DEFAULT NULL,
  `lang` varchar(20) DEFAULT NULL,
  `delete_time` varchar(20) DEFAULT '1',
  `image` text,
  `fanyi_from_id` int(12) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_news_classify`
--

LOCK TABLES `erdai_news_classify` WRITE;
/*!40000 ALTER TABLE `erdai_news_classify` DISABLE KEYS */;
INSERT INTO `erdai_news_classify` VALUES (14,'冰箱','冰箱，洗衣机','冰箱，洗衣机','冰箱，洗衣机',13,0,'master',1636081735,'zh','1',NULL,0),(15,'企业新闻','','','',18,0,'master',1641185447,'zh','1','[]',0),(16,'Enterprise News','','','',0,0,'master',1638512614,'en','1','[]',15),(17,'行业资讯','行业资讯','行业资讯','',18,0,'master',1641185425,'zh','1','[]',0),(18,'新闻资讯','新闻资讯','新闻资讯','新闻资讯',0,0,'master',1641184176,'zh','1','[]',0);
/*!40000 ALTER TABLE `erdai_news_classify` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_onepage`
--

DROP TABLE IF EXISTS `erdai_onepage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_onepage` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `seo_title` varchar(220) DEFAULT NULL,
  `parent` int(10) DEFAULT '0' COMMENT '分类ID',
  `keyword` varchar(220) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `image` text COMMENT '图片',
  `content` longtext COMMENT '详细内容',
  `time` varchar(255) DEFAULT NULL,
  `admin_user` varchar(20) DEFAULT NULL,
  `weight` int(6) DEFAULT '0',
  `lang` varchar(20) DEFAULT NULL,
  `att_type` int(5) DEFAULT NULL,
  `fanyi_from_id` int(12) DEFAULT '0',
  `template` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_onepage`
--

LOCK TABLES `erdai_onepage` WRITE;
/*!40000 ALTER TABLE `erdai_onepage` DISABLE KEYS */;
INSERT INTO `erdai_onepage` VALUES (1,'关于我们','关于我们',14,'驴赞saas旅游小程序平台','驴赞saas旅游小程序平台 是一家主要从事旅游SaaS服务的企业，帮助旅行社、景区、酒店以及旅游行业从业人员、进行网上开店、社交营销、网上办公、提高留存复购，拓展全渠道新零售业务。','[]','<p><strong>驴赞saas旅游小程序平台</strong> 是一家主要从事旅游SaaS服务的企业，帮助旅行社、景区、酒店以及旅游行业从业人员、进行网上开店、社交营销、网上办公、提高留存复购，拓展全渠道新零售业务。</p>\n<p>驴赞平台目前支持PC端、微信小程序、微信公众号、支付宝小程序、百度小程序、抖音小程序、H5移动端的管理和应用！</p>\n<p><strong>驴赞平台和传统建站公司的优势对比</strong></p>\n<div>\n<table>\n<thead>\n<tr>\n<th>项目</th>\n<th>传统建站公司</th>\n<th>使用驴赞平台</th>\n<th>备注</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>域名注册</td>\n<td>必须，按年续费</td>\n<td><strong>不需要</strong></td>\n<td>如果开通驴赞PC版，则也需要</td>\n</tr>\n<tr>\n<td>服务器购买</td>\n<td>必须，按年续费</td>\n<td><strong>不需要</strong></td>\n<td>&nbsp;</td>\n</tr>\n<tr>\n<td>域名备案</td>\n<td>必须，耗时较长</td>\n<td><strong>不需要</strong></td>\n<td>如果开通驴赞PC版，则也需要</td>\n</tr>\n<tr>\n<td>系统安装调试</td>\n<td>必须</td>\n<td><strong>不需要</strong></td>\n<td>&nbsp;</td>\n</tr>\n<tr>\n<td>服务器维护</td>\n<td>必须</td>\n<td><strong>不需要</strong></td>\n<td>统一维护</td>\n</tr>\n<tr>\n<td>小程序调试</td>\n<td>必须</td>\n<td><strong>不需要</strong></td>\n<td>&nbsp;</td>\n</tr>\n<tr>\n<td>公众号调试</td>\n<td>必须</td>\n<td><strong>不需要</strong></td>\n<td>&nbsp;</td>\n</tr>\n<tr>\n<td>支付调试</td>\n<td>必须</td>\n<td><strong>不需要</strong></td>\n<td>&nbsp;</td>\n</tr>\n<tr>\n<td>系统升级</td>\n<td>单独升级，麻烦</td>\n<td><strong> 统一升级，保证实时最新</strong></td>\n<td>&nbsp;</td>\n</tr>\n<tr>\n<td>源码部署</td>\n<td>必须</td>\n<td>支持</td>\n<td>驴赞同时支持源码单机部署模式</td>\n</tr>\n<tr>\n<td>SSL安全证书</td>\n<td>必须</td>\n<td><strong>不需要</strong></td>\n<td>驴赞统一部署，无需单独配置</td>\n</tr>\n<tr>\n<td>数据备份</td>\n<td>需要自己操作，麻烦</td>\n<td>统一备份</td>\n<td>阿里云成熟备份技术</td>\n</tr>\n<tr>\n<td>上线时间</td>\n<td>全流程下来15-30天不等</td>\n<td>急速注册，即开即用，最快半天可上线</td>\n<td>*</td>\n</tr>\n</tbody>\n</table>\n</div>','1640226892','master',0,'zh',2,0,NULL),(2,'联系我们','联系我们',14,'','','[]','<p><span style=\"font-size: 18px;\"><strong>长沙市丁香网络科技有限公司<br /></strong></span></p>\n<p>24小时咨询：150 7486 7188 （符先生）</p>\n<p>电话：0731-89579388</p>\n<p>Email：156779955@qq.com</p>\n<p>官网：https://www.erdaicms.com</p>\n<p>地址：湖南省长沙市国家级经济技术开发区新长海广场</p>','1641195890','master',0,'zh',3,0,'默认模板'),(6,'About us','About us',14,'Lvzan SaaS tourism applet platform','Lvzan SaaS tourism applet platform is an enterprise mainly engaged in tourism SaaS services, helping travel agencies, scenic spots, hotels and employees in the tourism industry to open online stores, social marketing, online office, improve retention and repurchase, and expand new retail business in all channels.','[]','Lvzan SaaS tourism applet platform is an enterprise mainly engaged in tourism SaaS services, helping travel agencies, scenic spots, hotels and employees in the tourism industry to open online stores, social marketing, online office, improve retention and repurchase, and expand new retail business in all channels. Donkey tiktok platform supports PC terminal, WeChat applet, WeChat official account, Alipay applet, Baidu applet, jitter applet, H5 mobile terminal management and application. Comparison of advantages between lvzan platform and traditional website building companies: traditional website building companies use lvzan platform. Note that domain name registration is required and annual renewal is not required. If lvzan PC version is opened, server purchase is also required, and annual renewal is not required & nbsp; Domain name filing must take a long time. If you open lvzan PC version, you also need system installation and debugging. You must not & nbsp; Unified maintenance is not required for server maintenance, and applet debugging is not required & nbsp; The official account must not be debugged by &nbsp. Payment debugging must not be required & nbsp; The system is upgraded separately. It is troublesome to upgrade uniformly to ensure the real-time update & nbsp; The source deployment must support lvzan and the source stand-alone deployment mode. The SSL security certificate must not be deployed uniformly without lvzan. There is no need to configure data backup separately. It needs to be operated by yourself. It\'s troublesome to make a unified backup. Alibaba cloud\'s mature backup technology goes online in 15-30 days. It can be registered quickly, ready to use, and can be online in half a day at most*','1640226892','master',0,'en',2,0,NULL),(7,'عنا','عنا',0,'برنامج حمار زين ساس للسفر','حمار zansaas السفر منصة صغيرة هي شركة تعمل اساسا في مجال السياحة ادارة العلاقات مع الخدمات ، ومساعدة وكالات السفر ، والمواقع السياحية ، والفنادق ، وصناعة السياحة الممارسين ، فتح متجر على الانترنت ، والتسويق الاجتماعي ، على الانترنت مكتب ، وتحسين الاحتفاظ إعادة الشراء ، وتوسيع قنوات البيع بالتجزئة الجديدة .','[]','حمار zansaas السفر منصة صغيرة هي شركة تعمل اساسا في مجال السياحة ادارة العلاقات مع الخدمات ، ومساعدة وكالات السفر ، والمواقع السياحية ، والفنادق ، وصناعة السياحة الممارسين ، فتح متجر على الانترنت ، والتسويق الاجتماعي ، على الانترنت مكتب ، وتحسين الاحتفاظ إعادة الشراء ، وتوسيع قنوات البيع بالتجزئة الجديدة . حمار الحمد منصة تدعم حاليا جهاز الكمبيوتر ، مايكرو رسالة صغيرة ، رسالة صغيرة من الجمهور ، ودفع الكنز الصغير ، بايدو الصغيرة ، يهز الصوت الصغير ، H5 موبايل إدارة وتطبيق ! حمار الحمد منصة والتقليدية بناء محطة الشركة مزايا المشروع مقارنة التقليدية بناء محطة الشركة استخدام حمار الحمد منصة ملاحظات تسجيل اسم النطاق يجب أن يكون ، التجديد السنوي لا تحتاج إلى فتح حمار الحمد نسخة الكمبيوتر ، تحتاج أيضا إلى شراء الخادم ، التجديد السنوي لا تحتاج ونبسب ؛ اسم النطاق يجب أن تكون مسجلة ، وقتا طويلا لا تحتاج إلى فتح حمار الحمد نسخة الكمبيوتر ، تحتاج أيضا إلى تركيب نظام التصحيح يجب أن لا تحتاج إلى نبسب ؛ خادم الصيانة يجب أن لا تتطلب صيانة موحدة التصحيح يجب أن لا تتطلب ونبسب ؛ الجمهور رقم التصحيح يجب أن لا تتطلب &nbsp ; دفع التصحيح يجب أن لا تتطلب &nbsp ; ترقية النظام بشكل منفصل ، عناء ترقية موحدة ، وضمان في الوقت الحقيقي أحدث ونبسب ؛ المصدر يجب أن تدعم نشر حمار حمار الحمد في نفس الوقت دعم مصدر واحد وضع النشر SSL شهادة الأمن يجب أن لا تحتاج إلى حمار الحمد نشر موحدة ، لا تحتاج إلى تكوين بيانات منفصلة النسخ الاحتياطي تحتاج إلى تشغيل الخاصة بهم ، من الصعب توحيد النسخ الاحتياطي النسخ الاحتياطي التكنولوجيا الناضجة علي سحابة على الانترنت في العملية برمتها من 15-30 يوما من أسفل إلى سرعة التسجيل ، وهذا هو ، على استعداد لاستخدام أسرع نصف يوم على الانترنت *','1640226892','master',0,'ara',2,1,NULL),(8,'Sobre nós','Sobre nós',0,'Plataforma de miniaplicativos Lvzan SaaS','Lvzan SaaS plataforma de aplicativos turísticos é uma empresa que se dedica principalmente a serviços turísticos SaaS, ajudando as agências de viagens, pontos turísticos, hotéis e empregados na indústria do turismo a abrir lojas online, marketing social, escritório online, melhorar a retenção e recompra, e expandir novos negócios de varejo em todos os canais.','[]','Lvzan SaaS plataforma de aplicativos turísticos é uma empresa que se dedica principalmente a serviços turísticos SaaS, ajudando as agências de viagens, pontos turísticos, hotéis e empregados na indústria do turismo a abrir lojas online, marketing social, escritório online, melhorar a retenção e recompra, e expandir novos negócios de varejo em todos os canais. A plataforma Lvzan atualmente suporta a gestão e aplicação de PC, applet wechat, wechat conta pública, applet Alipay, baidu applet, applet de bufagem e terminal móvel H5! Comparação de vantagens entre a plataforma lvzan e as empresas de construção de sites tradicionais: as empresas de construção de sites tradicionais usam a plataforma lvzan. Note que o registro do nome de domínio é necessário e a renovação anual não é necessária. Se a versão do PC lvzan for aberta, a compra de servidores também é necessária, e a renovação anual não é necessária &nbsp; O arquivo do nome do domínio deve levar muito tempo. Se você abrir a versão do PC lvzan, você também precisa de instalação do sistema e depuração. Você não deve +nbsp; Manutenção unificada não é necessária para a manutenção do servidor, e depuração do\'applet\'não é necessária &nbsp; A depuração da conta pública não deve ser exigida  nbsp; A depuração do pagamento não deve ser exigida  nbsp; O sistema é atualizado separadamente. É problemático atualizar-se uniformemente para garantir a atualização em tempo real &nbsp; A implantação da fonte deve suportar o lvzan e o modo de implantação do stand- alone da fonte. O certificado de segurança do SSL não deve ser implantado uniformemente sem o lvzan. Não há necessidade de configurar o backup de dados separadamente. Ele precisa ser operado por si mesmo. É problemático fazer um backup unificado. A tecnologia de backup maduro da nuvem do Alibaba vai on-line em 15-30 dias. Ele pode ser registrado rapidamente, pronto para usar, e pode estar on-line em meio dia no máximo*','1640226892','master',0,'pt',2,1,NULL),(9,'contact us','contact us',0,'','','[]','24-hour consultation of Changsha clove Network Technology Co., Ltd.: 15074867188 (Mr. Fu) Tel.: 0731-89579388email: 156779955@qq.com Official website: https://www.erdaicms.com Address: new Changhai square, national economic and Technological Development Zone, Changsha, Hunan','1641195890','master',0,'en',3,2,'默认模板'),(10,'اتصل بنا','اتصل بنا',0,'','','[]','تشانغشا القرنفل شبكة التكنولوجيا المحدودة ، المحدودة 24 ساعة التشاور : 15074867188 ( السيد فو ) الهاتف : 0731-89579388 البريد الإلكتروني : 156779955@qq.com الموقع الرسمي https://www.erdaicms.com العنوان : xinchanghai بلازا ، منطقة التنمية الاقتصادية والتكنولوجية الوطنية ، وتشانغشا ، وهونان ، والصين .','1641195890','master',0,'ara',3,2,'默认模板'),(11,'entre em contato','entre em contato',0,'','','[]','Consulta de 24h da Changsha clove Network Technology Co., Ltd.: 15074867188 (Sr. Fu) Tel.: 0731-89579388e-mail: 156779955@qq.com Sítio Web oficial: https://www.erdaicms.com Endereço: New Changhai square, National Economic and Technological Development Zone, Changsha, Hunan','1641195890','master',0,'pt',3,2,'默认模板');
/*!40000 ALTER TABLE `erdai_onepage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_onepage_classify`
--

DROP TABLE IF EXISTS `erdai_onepage_classify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_onepage_classify` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(220) DEFAULT NULL,
  `seo_title` varchar(220) DEFAULT NULL,
  `keyword` varchar(220) DEFAULT NULL,
  `description` varchar(400) DEFAULT NULL,
  `parent` int(5) DEFAULT '0' COMMENT '上级分类',
  `weight` int(5) DEFAULT '0',
  `admin_user` varchar(30) DEFAULT '0',
  `time` int(12) DEFAULT NULL,
  `lang` varchar(20) DEFAULT NULL,
  `delete_time` varchar(20) DEFAULT '1',
  `fanyi_from_id` int(12) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_onepage_classify`
--

LOCK TABLES `erdai_onepage_classify` WRITE;
/*!40000 ALTER TABLE `erdai_onepage_classify` DISABLE KEYS */;
INSERT INTO `erdai_onepage_classify` VALUES (14,'关于我们','','','',0,0,'master',1638421983,'zh','1',0),(15,'About us','','','',0,0,'master',1638421983,'en','1',14);
/*!40000 ALTER TABLE `erdai_onepage_classify` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_plug`
--

DROP TABLE IF EXISTS `erdai_plug`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_plug` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `value` text,
  `admin_user` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_plug`
--

LOCK TABLES `erdai_plug` WRITE;
/*!40000 ALTER TABLE `erdai_plug` DISABLE KEYS */;
INSERT INTO `erdai_plug` VALUES (1,'{\"fanyi_baidu_appid\":\"20211207001021054\",\"fanyi_baidu_key\":\"HPgFHq0wKwLx0XqezQZ0\",\"id\":1,\"admin_user\":\"master\"}','master');
/*!40000 ALTER TABLE `erdai_plug` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_position`
--

DROP TABLE IF EXISTS `erdai_position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_position` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `time` varchar(20) DEFAULT NULL,
  `admin_user` varchar(30) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `weight` int(5) DEFAULT '0',
  `description` varchar(220) DEFAULT NULL,
  `no` varchar(50) DEFAULT NULL,
  `department_rules` varchar(100) DEFAULT NULL,
  `data_roles` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_position`
--

LOCK TABLES `erdai_position` WRITE;
/*!40000 ALTER TABLE `erdai_position` DISABLE KEYS */;
INSERT INTO `erdai_position` VALUES (3,'1635662336','master','站长',0,'业务股站的站长','001',NULL,NULL),(4,'1635662364','master','办事员',0,'普通人员','002',NULL,NULL);
/*!40000 ALTER TABLE `erdai_position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_product`
--

DROP TABLE IF EXISTS `erdai_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_product` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(220) DEFAULT NULL,
  `seo_title` varchar(220) DEFAULT NULL,
  `keyword` varchar(220) DEFAULT NULL,
  `description` varchar(240) DEFAULT NULL,
  `parent` varchar(200) DEFAULT '0',
  `weight` int(10) DEFAULT '100',
  `image` text,
  `content` longtext,
  `content1` longtext,
  `price` decimal(8,2) DEFAULT NULL,
  `costprice` decimal(8,2) DEFAULT NULL,
  `marketprice` decimal(8,2) DEFAULT NULL,
  `stock` int(10) DEFAULT '0',
  `stockunit` varchar(20) DEFAULT NULL,
  `click` int(10) DEFAULT '0',
  `flag` varchar(200) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `admin_user` varchar(50) DEFAULT NULL,
  `lang` varchar(20) DEFAULT NULL,
  `attvalue` text,
  `attvaluebox` text,
  `attvaluetext` text,
  `attvaluetextarea` text,
  `status` varchar(10) DEFAULT '1',
  `department_rules` varchar(50) DEFAULT NULL,
  `fanyi_from_id` int(12) DEFAULT '0',
  `attvalueimage` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_product`
--

LOCK TABLES `erdai_product` WRITE;
/*!40000 ALTER TABLE `erdai_product` DISABLE KEYS */;
INSERT INTO `erdai_product` VALUES (10,'LED驱动电源','产品展示LED驱动电源','LED驱动电源','','[16]',0,'[{\"name\":\"image\\/20220101\\/fcf4efd69bf140e8cce8ecd3de11c34f.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/\\/uploads\\/image\\/20220101\\/fcf4efd69bf140e8cce8ecd3de11c34f.jpg\",\"a\":0,\"b\":0,\"uid\":1640967939278,\"status\":\"success\"}]','<div class=\"cpxq__bjq\">\n<div class=\"proconn\">\n<p>照明工程是指采用天然光或人工照明系统以满足特定光环境中照明要求的设计、技术及工程的学科。照明的要求主要有被照表面的光照度、亮度、显色性及光环境的视觉效果等。照明的光环境包括室内空间和道路、广场、景区、公园、建筑物等室外空间。</p>\n<p>照明工程工作程序一般是：照明工程设计师通过照明设计，技术人员进行照明工程安装、调试、验收等一些列活动。</p>\n<p>照明工程既有功能照明作用，更有美化城市环境的作用。随着社会科技发展，LED灯具在照明工程中的应用越来越普及。其节能、高亮度、色彩丰富、可控制性强等特点使得LED在照明工程得到广泛应用。</p>\n<p>2009年初，为了扩大内需，推动中国LED产业的发展，降低能源消耗，中国科技部推出&ldquo;十城万盏&rdquo;半导体照明应用示范城市方案，该计划涵盖北京、上海、深圳、武汉等21个国内发达城市。</p>\n<p>2009年4月，科技部于启动了&ldquo;十城万盏&rdquo;半导体照明应用工程试点工作。为进一步了解各试点城市的工作进展情况，支撑下一阶段&ldquo;十城万盏&rdquo;半导体照明应用工程试点工作，国家半导体照明工程研发及产业联盟受科技部高新司委托，拟于2010年7月-9月对&ldquo;十城万盏&rdquo;试点城市的试点工作进展情况进行分析调研。</p>\n</div>\n</div>','',0.00,0.00,0.00,0,'',16,'[]','1641182272','master','zh','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,0,'[[],[],[],[],[],[],[],[],[],[]]'),(11,'LED光源系列X100','LED光源系列X100','LED光源系列X100','LED光源系列X100','[18]',0,'[{\"name\":\"image\\/20220101\\/3fa2e4fe045239162cfd137518aa560c.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/\\/uploads\\/image\\/20220101\\/3fa2e4fe045239162cfd137518aa560c.jpg\",\"a\":0,\"b\":0,\"uid\":1640968657321,\"status\":\"success\"}]','','',0.00,0.00,0.00,0,'',20,'[]','1641186851','master','zh','[[],[\"88\"],[\"红\"],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[\"小\"],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,0,'[[],[],[],[],[],[],[],[],[],[]]'),(12,'LED工程照明LED工程照明X802','X802X802X802X802','X802X802X802X802','X802X802X802X802','\"\"',0,'[{\"name\":\"image\\/20220103\\/a91ac1366df61aaab5514591d08f9230.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220103\\/a91ac1366df61aaab5514591d08f9230.jpg\",\"a\":0,\"b\":0,\"uid\":1641169339873,\"status\":\"success\"}]','<div class=\"cpxq__bjq\">\n<div class=\"proconn\">\n<p>照明工程是指采用天然光或人工照明系统以满足特定光环境中照明要求的设计、技术及工程的学科。照明的要求主要有被照表面的光照度、亮度、显色性及光环境的视觉效果等。照明的光环境包括室内空间和道路、广场、景区、公园、建筑物等室外空间。</p>\n<p>照明工程工作程序一般是：照明工程设计师通过照明设计，技术人员进行照明工程安装、调试、验收等一些列活动。</p>\n<p>照明工程既有功能照明作用，更有美化城市环境的作用。随着社会科技发展，LED灯具在照明工程中的应用越来越普及。其节能、高亮度、色彩丰富、可控制性强等特点使得LED在照明工程得到广泛应用。</p>\n<p>2009年初，为了扩大内需，推动中国LED产业的发展，降低能源消耗，中国科技部推出&ldquo;十城万盏&rdquo;半导体照明应用示范城市方案，该计划涵盖北京、上海、深圳、武汉等21个国内发达城市。</p>\n<p>2009年4月，科技部于启动了&ldquo;十城万盏&rdquo;半导体照明应用工程试点工作。为进一步了解各试点城市的工作进展情况，支撑下一阶段&ldquo;十城万盏&rdquo;半导体照明应用工程试点工作，国家半导体照明工程研发及产业联盟受科技部高新司委托，拟于2010年7月-9月对&ldquo;十城万盏&rdquo;试点城市的试点工作进展情况进行分析调研。</p>\n</div>\n</div>','',0.00,0.00,0.00,0,'',16,'[]','1641169352','master','zh','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,0,'[[],[],[],[],[],[],[],[],[],[]]'),(14,'LED driving power supply','Product display LED driving power supply','LED driving power supply','','0',0,'[{\"name\":\"image\\/20220101\\/fcf4efd69bf140e8cce8ecd3de11c34f.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220101\\/fcf4efd69bf140e8cce8ecd3de11c34f.jpg\",\"a\":0,\"b\":0,\"uid\":1640967939278,\"status\":\"success\"}]','Lighting engineering refers to the design, technology and engineering of using natural light or artificial lighting system to meet the lighting requirements in specific light environment. The lighting requirements mainly include the illuminance, brightness, color rendering of the illuminated surface and the visual effect of the light environment. The lighting environment includes indoor space and outdoor space such as roads, squares, scenic spots, parks and buildings. The working procedure of lighting engineering is generally: the lighting engineering designer carries out a series of activities such as lighting engineering installation, commissioning and acceptance through lighting design. Lighting engineering not only has the function of lighting, but also beautifies the urban environment. With the development of social science and technology, LED lamps are more and more popular in lighting engineering. Its energy-saving, high brightness, rich color and strong controllability make LED widely used in lighting engineering. In early 2009, in order to expand domestic demand, promote the development of China\'s LED industry and reduce energy consumption, China\'s Ministry of science and Technology launched & ldquo; Ten cities and ten thousand lanterns & rdquo; Semiconductor lighting application demonstration city scheme, which covers 21 domestic developed cities such as Beijing, Shanghai, Shenzhen and Wuhan. In April 2009, the Ministry of science and Technology launched & ldquo; Ten cities and ten thousand lanterns & rdquo; Pilot work of semiconductor lighting application project. In order to further understand the work progress of each pilot city and support the next stage & ldquo; Ten cities and ten thousand lanterns & rdquo; The national semiconductor lighting engineering R & D and Industry Alliance, entrusted by the high technology and innovation Department of the Ministry of science and technology, plans to carry out the pilot work of semiconductor lighting application engineering from July to September 2010; Ten cities and ten thousand lanterns & rdquo; Analyze and investigate the progress of pilot work in pilot cities.','',0.00,0.00,0.00,0,'',3,'[]','1640967970','master','en','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,10,'[[],[],[],[],[],[],[],[],[],[]]'),(15,'قاد السلطة','عرض المنتج قيادة السلطة الصمام','قاد السلطة','','0',0,'[{\"name\":\"image\\/20220101\\/fcf4efd69bf140e8cce8ecd3de11c34f.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220101\\/fcf4efd69bf140e8cce8ecd3de11c34f.jpg\",\"a\":0,\"b\":0,\"uid\":1640967939278,\"status\":\"success\"}]','هندسة الإضاءة يشير إلى استخدام الضوء الطبيعي أو الاصطناعي نظام الإضاءة لتلبية متطلبات الإضاءة في ضوء البيئة المحددة في التصميم والتكنولوجيا والهندسة . متطلبات الإضاءة تشمل الإضاءة ، السطوع ، اللون ، تأثير مرئي من ضوء البيئة . الإضاءة البيئة بما في ذلك الفضاء الداخلي والطرق والساحات والمناظر الطبيعية الخلابة والحدائق والمباني وغيرها من الأماكن في الهواء الطلق . هندسة الإضاءة إجراءات العمل عموما : الإضاءة مهندس تصميم الإضاءة ، والموظفين التقنيين في تركيب الإضاءة ، والتكليف ، وقبول عدد من الأنشطة . هندسة الإضاءة ليس فقط وظيفة الإضاءة ، ولكن أيضا وظيفة تجميل البيئة الحضرية . جنبا إلى جنب مع تطور العلم والتكنولوجيا ، وتطبيق الصمام مصباح في هندسة الإضاءة أصبحت أكثر وأكثر شعبية . الصمام يستخدم على نطاق واسع في هندسة الإضاءة بسبب توفير الطاقة ، سطوع عالية ، والألوان الغنية وقوية التحكم . في أوائل عام 2009 ، من أجل توسيع الطلب المحلي ، وتعزيز التنمية في الصين صناعة الصمام ، والحد من استهلاك الطاقة ، وزارة العلوم والتكنولوجيا في الصين أطلقت &quot ; عشرة آلاف مدينة أشباه الموصلات الإضاءة تطبيق برنامج المدينة النموذجية ، التي تغطي بكين وشانغهاى وشنتشن ، ووهان ، وغيرها من المدن المتقدمة المحلية 21 . في نيسان / أبريل 2009 ، أطلقت وزارة العلوم والتكنولوجيا &quot ; عشرة آلاف مدينة أشباه الموصلات الإضاءة تطبيق المشروع التجريبي . \" دعم المرحلة المقبلة من أجل فهم أفضل للتقدم المحرز في مختلف المدن الرائدة . عشرة آلاف مدينة أشباه الموصلات الإضاءة تطبيق المشروع التجريبي ، أشباه الموصلات الإضاءة الوطنية مشروع البحث والتطوير والصناعة التحالف بتكليف من وزارة العلوم والتكنولوجيا قاو شين ، في تموز / يوليه - أيلول / سبتمبر 2010 إلى &quot ; عشرة آلاف مدينة تحليل و تحقيق التقدم المحرز في العمل التجريبي في المدن التجريبية .','',0.00,0.00,0.00,0,'',1,'[]','1640967970','master','ara','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,10,'[[],[],[],[],[],[],[],[],[],[]]'),(16,'Fornecimento de energia de condução LED','Fornecimento de energia de condução LED','Fornecimento de energia de condução LED','','0',0,'[{\"name\":\"image\\/20220101\\/fcf4efd69bf140e8cce8ecd3de11c34f.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220101\\/fcf4efd69bf140e8cce8ecd3de11c34f.jpg\",\"a\":0,\"b\":0,\"uid\":1640967939278,\"status\":\"success\"}]','Engenharia de iluminação refere-se ao projeto, tecnologia e engenharia de usar luz natural ou sistema de iluminação artificial para cumprir os requisitos de iluminação em ambiente de luz específico. Os requisitos de iluminação incluem principalmente a iluminação, brilho, renderização de cores da superfície iluminada e o efeito visual do ambiente de luz. O ambiente de iluminação inclui espaço interior e espaço exterior, tais como estradas, praças, pontos turísticos, parques e edifícios. O procedimento de trabalho da engenharia de iluminação é geralmente: o projetista de engenharia de iluminação realiza uma série de atividades, tais como instalação de engenharia de iluminação, comissionamento e aceitação através de design de iluminação. A engenharia de iluminação não só tem a função de iluminação, mas também embeleza o ambiente urbano. Com o desenvolvimento da ciência social e tecnologia, lâmpadas LED são cada vez mais populares na engenharia de iluminação. Sua economia de energia, alta luminosidade, cor rica e forte controle tornam o LED amplamente usado em engenharia de iluminação. No in ício do período 2009, a fim de aumentar a procura interna, promover o desenvolvimento da indústria de LED da China e reduzir o consumo de energia, o Ministério da Ciência e Tecnologia da China lançou &ldquo; Dez cidades e dez mil lanternas &rdquo; Esquema de demonstração de aplicação de iluminação semicondutor da cidade, que abrange 21 cidades desenvolvidas no mercado interno, como Pequim, Xangai, Shenzhen e Wuhan. Em Abril 2009, o Ministério da Ciência e Tecnologia lançou o &ldquo; Dez cidades e dez mil lanternas &rdquo; Trabalhos-piloto do projecto de aplicação de iluminação de semicondutores. A fim de compreender melhor o progresso do trabalho de cada cidade-piloto e apoiar a próxima etapa &ldquo; Dez cidades e dez mil lanternas &rdquo; A engenharia nacional de iluminação de semicondutores R&D e Industry Alliance, confiada pelo Departamento de Alta Tecnologia e Inovação do Ministério da Ciência e Tecnologia, planeia realizar o trabalho piloto da engenharia de aplicações de iluminação de semicondutores de Julho a Setembro 2010; Dez cidades e dez mil lanternas &rdquo; Analisar e investigar o progresso do trabalho piloto nas cidades-piloto.','',0.00,0.00,0.00,0,'',1,'[]','1640967970','master','pt','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,10,'[[],[],[],[],[],[],[],[],[],[]]'),(17,'Fuente de alimentación de conducción LED','Fuente de alimentación de la unidad LED','Fuente de alimentación de conducción LED','','0',0,'[{\"name\":\"image\\/20220101\\/fcf4efd69bf140e8cce8ecd3de11c34f.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220101\\/fcf4efd69bf140e8cce8ecd3de11c34f.jpg\",\"a\":0,\"b\":0,\"uid\":1640967939278,\"status\":\"success\"}]','La ingeniería de iluminación se refiere al diseño, la tecnología y la disciplina de ingeniería que utiliza la luz natural o el sistema de iluminación artificial para satisfacer los requisitos de iluminación en un entorno de iluminación específico. Los requisitos de iluminación incluyen principalmente la iluminación de la superficie iluminada, la luminancia, el color y el efecto visual del entorno de luz. El entorno de iluminación incluye el espacio interior y el espacio exterior, como carreteras, plazas, lugares escénicos, parques y edificios. El procedimiento de trabajo del proyecto de iluminación es generalmente: el diseñador del proyecto de iluminación a través del diseño de iluminación, el personal técnico lleva a cabo la instalación del proyecto de iluminación, depuración, aceptación y otras actividades. El proyecto de iluminación no sólo tiene la función de iluminación funcional, sino que también embellece el medio ambiente urbano. Con el desarrollo de la Ciencia y la tecnología, las lámparas LED se utilizan cada vez más ampliamente en la ingeniería de iluminación. Sus características de ahorro de energía, alto brillo, color rico y fuerte controlabilidad hacen que el LED se aplique ampliamente en la ingeniería de iluminación. A principios de 2009, con el fin de ampliar la demanda interna, promover el desarrollo de la industria LED en China y reducir el consumo de energía, el Ministerio de Ciencia y tecnología de China puso en marcha ldquo; Diez ciudades y diez mil calendarios & rdquo; El programa de ciudades de demostración para aplicaciones de iluminación de semiconductores abarca 21 ciudades desarrolladas en China, como Beijing, Shanghai, Shenzhen y Wuhan. En abril de 2009, el Ministerio de Ciencia y tecnología puso en marcha ldquo; Diez ciudades y diez mil calendarios & rdquo; Proyecto piloto de iluminación de semiconductores. Con el fin de comprender mejor el progreso de la labor en las ciudades piloto, se apoyó la siguiente etapa: ldquo; Diez ciudades y diez mil calendarios & rdquo; El proyecto piloto de aplicación de iluminación de semiconductores, la investigación y el desarrollo del proyecto nacional de iluminación de semiconductores y la Alianza de la industria, encargado por el Departamento de Ciencia y tecnología de Gaoxin del Ministerio de Ciencia y tecnología, se llevarán a cabo de julio a septiembre de 2010. Diez ciudades y diez mil calendarios & rdquo; Analizar e investigar el progreso del trabajo piloto en las ciudades piloto.','',0.00,0.00,0.00,0,'',1,'[]','1640967970','master','spa','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,10,'[[],[],[],[],[],[],[],[],[],[]]'),(18,'Stromversorgung mit LED','Produktanzeige LED-Antriebs-Stromversorgung','Stromversorgung mit LED','','0',0,'[{\"name\":\"image\\/20220101\\/fcf4efd69bf140e8cce8ecd3de11c34f.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220101\\/fcf4efd69bf140e8cce8ecd3de11c34f.jpg\",\"a\":0,\"b\":0,\"uid\":1640967939278,\"status\":\"success\"}]','Die Lichttechnik bezieht sich auf das Design, die Technologie und die Technik der Verwendung von natürlichem Licht oder künstlichem Beleuchtungssystem, um die Beleuchtungsanforderungen in einer bestimmten Lichtumgebung zu erfüllen. Die Lichtanforderungen umfassen vor allem die Leuchtkraft, Helligkeit, die Farbwiedergabe der beleuchteten Oberfläche und die optische Wirkung der Lichtumgebung. Die Beleuchtung umfasst Innen- und Außenbereich wie Straßen, Plätze, malerische Plätze, Parks und Gebäude. Die Arbeitsweise der Lichttechnik ist im Allgemeinen: Der Lichtingenieur führt eine Reihe von Tätigkeiten durch, wie z.B. Beleuchtungstechnik-Installation, Inbetriebnahme und Abnahme durch Lichtdesign. Die Lichttechnik hat nicht nur die Funktion der Beleuchtung, sondern auch die Schönheit der städtischen Umgebung. Mit der Entwicklung von Sozialwissenschaft und Technologie sind LED-Lampen immer beliebter in der Lichttechnik. Durch seine energiesparende, hohe Helligkeit, eine reiche Farbe und eine starke Steuerbarkeit werden LED in der Lichttechnik weit verbreitet eingesetzt. In der frühen 2009, um die Inlandsnachfrage zu erweitern, die Entwicklung der chinesischen LED-Industrie zu fördern und den Energieverbrauch zu verringern, startete China s Ministerium für Wissenschaft und Technologie & ldquo; Zehn Städte und zehntausend Laternen Das Demonstrationsprogramm für Halbleiterbeleuchtung umfasst 21-entwickelte Städte wie Peking, Shanghai, Shenzhen und Wuhan. Im April 2009 startete das Ministerium für Wissenschaft und Technologie & ldquo; Zehn Städte und zehntausend Laternen Pilotprojekt für das Projekt der Halbleiterbeleuchtung. Um den Fortschritt jeder Pilotstadt weiter zu verstehen und die nächste Stufe & ldquo zu unterstützen; Zehn Städte und zehntausend Laternen Die von der Hochtechnologie- und Innovationsabteilung des Ministeriums für Wissenschaft und Technologie beauftragte nationale Allianz für Halbleiterbeleuchtung und -technologie plant, die Pilotarbeit für die Anwendungstechnik von Halbleiterbeleuchtung von Juli bis September 2010 durchzuführen; Zehn Städte und zehntausend Laternen Analysieren und untersuchen Sie den Fortschritt der Pilotarbeit in Pilotstädten.','',0.00,0.00,0.00,0,'',1,'[]','1640967970','master','de','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,10,'[[],[],[],[],[],[],[],[],[],[]]'),(19,'источник питания','Показать источник питания','источник питания','','0',0,'[{\"name\":\"image\\/20220101\\/fcf4efd69bf140e8cce8ecd3de11c34f.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220101\\/fcf4efd69bf140e8cce8ecd3de11c34f.jpg\",\"a\":0,\"b\":0,\"uid\":1640967939278,\"status\":\"success\"}]','под осветительными работами понимаются такие дисциплины, как проектирование, техника и инженерное дело, в которых используются системы естественного освещения или искусственного освещения для удовлетворения потребностей в освещении в конкретной световой среде. требования, предъявляемые к освещению, касаются, в частности, освещенности, яркости, яркости и визуальных эффектов световой среды. световая среда включает пространство внутри комнаты и дороги, площадь, живописные зоны, парки, здания и другие внешние помещения. Программа работы по освещению обычно: проектировщик осветительных работ через дизайн освещения, технический персонал проводит монтаж осветительных работ, наладку, приемку и другие виды деятельности. освещение имеет как функциональное освещение, так и более качественное воздействие на городскую среду. с развитием социальной науки и техники светодиодные лампы все шире используются в осветительных работах. его энергосбережение, высокая яркость, насыщенность цветом, высокая управляемость и т.д. В начале 2009 г. в целях расширения внутреннего спроса, стимулирования развития отрасли LED в китае, сокращения энергопотребления, министерство науки и техники КНР запустило & ldquo; & rdquo; демонстрационная городская Программа применения полупроводникового освещения, охватывающая 21 развитый город страны: пекин, шанхай, шэньчжэнь и ухань. в апреле 2009 г. & ldquo; & rdquo; экспериментальная работа по применению полупроводникового освещения. в целях получения более подробной информации о ходе работы в экспериментальных городах поддерживает следующий этап & ldquo; & rdquo; пилотная работа по применению полупроводникового освещения, Национальный союз по исследованию и разработке полупроводниковых осветительных приборов и промышленности по поручению высшего и нового Департамента министерства науки и техники, в июле - сентябре 2010 года; & rdquo; в экспериментальном городе проводится анализ и исследование хода осуществления экспериментальных проектов.','',0.00,0.00,0.00,0,'',2,'[]','1640967970','master','ru','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,10,'[[],[],[],[],[],[],[],[],[],[]]'),(20,'LED light source series X100','LED light source series X100','LED light source series X100','LED light source series X100','0',0,'[{\"name\":\"image\\/20220101\\/3fa2e4fe045239162cfd137518aa560c.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220101\\/3fa2e4fe045239162cfd137518aa560c.jpg\",\"a\":0,\"b\":0,\"uid\":1640968657321,\"status\":\"success\"}]','Lighting engineering refers to the design, technology and engineering of using natural light or artificial lighting system to meet the lighting requirements in specific light environment. The lighting requirements mainly include the illuminance, brightness, color rendering of the illuminated surface and the visual effect of the light environment. The lighting environment includes indoor space and outdoor space such as roads, squares, scenic spots, parks and buildings. The working procedure of lighting engineering is generally: the lighting engineering designer carries out a series of activities such as lighting engineering installation, commissioning and acceptance through lighting design. Lighting engineering not only has the function of lighting, but also beautifies the urban environment. With the development of social science and technology, LED lamps are more and more popular in lighting engineering. Its energy-saving, high brightness, rich color and strong controllability make LED widely used in lighting engineering. In early 2009, in order to expand domestic demand, promote the development of China\'s LED industry and reduce energy consumption, China\'s Ministry of science and Technology launched & ldquo; Ten cities and ten thousand lanterns & rdquo; Semiconductor lighting application demonstration city scheme, which covers 21 domestic developed cities such as Beijing, Shanghai, Shenzhen and Wuhan. In April 2009, the Ministry of science and Technology launched & ldquo; Ten cities and ten thousand lanterns & rdquo; Pilot work of semiconductor lighting application project. In order to further understand the work progress of each pilot city and support the next stage & ldquo; Ten cities and ten thousand lanterns & rdquo; The national semiconductor lighting engineering R & D and Industry Alliance, entrusted by the high technology and innovation Department of the Ministry of science and technology, plans to carry out the pilot work of semiconductor lighting application engineering from July to September 2010; Ten cities and ten thousand lanterns & rdquo; Analyze and investigate the progress of pilot work in pilot cities.','',0.00,0.00,0.00,0,'',1,'[]','1640968689','master','en','[[],[\"88\"],[\"红\"],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[\"小\"],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,11,'[[],[],[],[],[],[],[],[],[],[]]'),(21,'أدى ضوء سلسلة X100','أدى ضوء سلسلة X100','أدى ضوء سلسلة X100','أدى ضوء سلسلة X100','0',0,'[{\"name\":\"image\\/20220101\\/3fa2e4fe045239162cfd137518aa560c.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220101\\/3fa2e4fe045239162cfd137518aa560c.jpg\",\"a\":0,\"b\":0,\"uid\":1640968657321,\"status\":\"success\"}]','هندسة الإضاءة يشير إلى استخدام الضوء الطبيعي أو الاصطناعي نظام الإضاءة لتلبية متطلبات الإضاءة في ضوء البيئة المحددة في التصميم والتكنولوجيا والهندسة . متطلبات الإضاءة تشمل الإضاءة ، السطوع ، اللون ، تأثير مرئي من ضوء البيئة . الإضاءة البيئة بما في ذلك الفضاء الداخلي والطرق والساحات والمناظر الطبيعية الخلابة والحدائق والمباني وغيرها من الأماكن في الهواء الطلق . هندسة الإضاءة إجراءات العمل عموما : الإضاءة مهندس تصميم الإضاءة ، والموظفين التقنيين في تركيب الإضاءة ، والتكليف ، وقبول عدد من الأنشطة . هندسة الإضاءة ليس فقط وظيفة الإضاءة ، ولكن أيضا وظيفة تجميل البيئة الحضرية . جنبا إلى جنب مع تطور العلم والتكنولوجيا ، وتطبيق الصمام مصباح في هندسة الإضاءة أصبحت أكثر وأكثر شعبية . الصمام يستخدم على نطاق واسع في هندسة الإضاءة بسبب توفير الطاقة ، سطوع عالية ، والألوان الغنية وقوية التحكم . في أوائل عام 2009 ، من أجل توسيع الطلب المحلي ، وتعزيز التنمية في الصين صناعة الصمام ، والحد من استهلاك الطاقة ، وزارة العلوم والتكنولوجيا في الصين أطلقت &quot ; عشرة آلاف مدينة أشباه الموصلات الإضاءة تطبيق برنامج المدينة النموذجية ، التي تغطي بكين وشانغهاى وشنتشن ، ووهان ، وغيرها من المدن المتقدمة المحلية 21 . في نيسان / أبريل 2009 ، أطلقت وزارة العلوم والتكنولوجيا &quot ; عشرة آلاف مدينة أشباه الموصلات الإضاءة تطبيق المشروع التجريبي . \" دعم المرحلة المقبلة من أجل فهم أفضل للتقدم المحرز في مختلف المدن الرائدة . عشرة آلاف مدينة أشباه الموصلات الإضاءة تطبيق المشروع التجريبي ، أشباه الموصلات الإضاءة الوطنية مشروع البحث والتطوير والصناعة التحالف بتكليف من وزارة العلوم والتكنولوجيا قاو شين ، في تموز / يوليه - أيلول / سبتمبر 2010 إلى &quot ; عشرة آلاف مدينة تحليل و تحقيق التقدم المحرز في العمل التجريبي في المدن التجريبية .','',0.00,0.00,0.00,0,'',1,'[]','1640968689','master','ara','[[],[\"88\"],[\"红\"],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[\"小\"],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,11,'[[],[],[],[],[],[],[],[],[],[]]'),(22,'Série de fonte luminosa LED X100','Série de fonte luminosa LED X100','Série de fonte luminosa LED X100','Série de fonte luminosa LED X100','0',0,'[{\"name\":\"image\\/20220101\\/3fa2e4fe045239162cfd137518aa560c.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220101\\/3fa2e4fe045239162cfd137518aa560c.jpg\",\"a\":0,\"b\":0,\"uid\":1640968657321,\"status\":\"success\"}]','Engenharia de iluminação refere-se ao projeto, tecnologia e engenharia de usar luz natural ou sistema de iluminação artificial para cumprir os requisitos de iluminação em ambiente de luz específico. Os requisitos de iluminação incluem principalmente a iluminação, brilho, renderização de cores da superfície iluminada e o efeito visual do ambiente de luz. O ambiente de iluminação inclui espaço interior e espaço exterior, tais como estradas, praças, pontos turísticos, parques e edifícios. O procedimento de trabalho da engenharia de iluminação é geralmente: o projetista de engenharia de iluminação realiza uma série de atividades, tais como instalação de engenharia de iluminação, comissionamento e aceitação através de design de iluminação. A engenharia de iluminação não só tem a função de iluminação, mas também embeleza o ambiente urbano. Com o desenvolvimento da ciência social e tecnologia, lâmpadas LED são cada vez mais populares na engenharia de iluminação. Sua economia de energia, alta luminosidade, cor rica e forte controle tornam o LED amplamente usado em engenharia de iluminação. No in ício do período 2009, a fim de aumentar a procura interna, promover o desenvolvimento da indústria de LED da China e reduzir o consumo de energia, o Ministério da Ciência e Tecnologia da China lançou &ldquo; Dez cidades e dez mil lanternas &rdquo; Esquema de demonstração de aplicação de iluminação semicondutor da cidade, que abrange 21 cidades desenvolvidas no mercado interno, como Pequim, Xangai, Shenzhen e Wuhan. Em Abril 2009, o Ministério da Ciência e Tecnologia lançou o &ldquo; Dez cidades e dez mil lanternas &rdquo; Trabalhos-piloto do projecto de aplicação de iluminação de semicondutores. A fim de compreender melhor o progresso do trabalho de cada cidade-piloto e apoiar a próxima etapa &ldquo; Dez cidades e dez mil lanternas &rdquo; A engenharia nacional de iluminação de semicondutores R&D e Industry Alliance, confiada pelo Departamento de Alta Tecnologia e Inovação do Ministério da Ciência e Tecnologia, planeia realizar o trabalho piloto da engenharia de aplicações de iluminação de semicondutores de Julho a Setembro 2010; Dez cidades e dez mil lanternas &rdquo; Analisar e investigar o progresso do trabalho piloto nas cidades-piloto.','',0.00,0.00,0.00,0,'',0,'[]','1640968689','master','pt','[[],[\"88\"],[\"红\"],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[\"小\"],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,11,'[[],[],[],[],[],[],[],[],[],[]]'),(23,'Serie de Fuentes luminosas LED x100','Serie de Fuentes luminosas LED x100','Serie de Fuentes luminosas LED x100','Serie de Fuentes luminosas LED x100','0',0,'[{\"name\":\"image\\/20220101\\/3fa2e4fe045239162cfd137518aa560c.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220101\\/3fa2e4fe045239162cfd137518aa560c.jpg\",\"a\":0,\"b\":0,\"uid\":1640968657321,\"status\":\"success\"}]','La ingeniería de iluminación se refiere al diseño, la tecnología y la disciplina de ingeniería que utiliza la luz natural o el sistema de iluminación artificial para satisfacer los requisitos de iluminación en un entorno de iluminación específico. Los requisitos de iluminación incluyen principalmente la iluminación de la superficie iluminada, la luminancia, el color y el efecto visual del entorno de luz. El entorno de iluminación incluye el espacio interior y el espacio exterior, como carreteras, plazas, lugares escénicos, parques y edificios. El procedimiento de trabajo del proyecto de iluminación es generalmente: el diseñador del proyecto de iluminación a través del diseño de iluminación, el personal técnico lleva a cabo la instalación del proyecto de iluminación, depuración, aceptación y otras actividades. El proyecto de iluminación no sólo tiene la función de iluminación funcional, sino que también embellece el medio ambiente urbano. Con el desarrollo de la Ciencia y la tecnología, las lámparas LED se utilizan cada vez más ampliamente en la ingeniería de iluminación. Sus características de ahorro de energía, alto brillo, color rico y fuerte controlabilidad hacen que el LED se aplique ampliamente en la ingeniería de iluminación. A principios de 2009, con el fin de ampliar la demanda interna, promover el desarrollo de la industria LED en China y reducir el consumo de energía, el Ministerio de Ciencia y tecnología de China puso en marcha ldquo; Diez ciudades y diez mil calendarios & rdquo; El programa de ciudades de demostración para aplicaciones de iluminación de semiconductores abarca 21 ciudades desarrolladas en China, como Beijing, Shanghai, Shenzhen y Wuhan. En abril de 2009, el Ministerio de Ciencia y tecnología puso en marcha ldquo; Diez ciudades y diez mil calendarios & rdquo; Proyecto piloto de iluminación de semiconductores. Con el fin de comprender mejor el progreso de la labor en las ciudades piloto, se apoyó la siguiente etapa: ldquo; Diez ciudades y diez mil calendarios & rdquo; El proyecto piloto de aplicación de iluminación de semiconductores, la investigación y el desarrollo del proyecto nacional de iluminación de semiconductores y la Alianza de la industria, encargado por el Departamento de Ciencia y tecnología de Gaoxin del Ministerio de Ciencia y tecnología, se llevarán a cabo de julio a septiembre de 2010. Diez ciudades y diez mil calendarios & rdquo; Analizar e investigar el progreso del trabajo piloto en las ciudades piloto.','',0.00,0.00,0.00,0,'',0,'[]','1640968689','master','spa','[[],[\"88\"],[\"红\"],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[\"小\"],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,11,'[[],[],[],[],[],[],[],[],[],[]]'),(24,'LED-Lichtquelle Serie X100','LED-Lichtquelle Serie X100','LED-Lichtquelle Serie X100','LED-Lichtquelle Serie X100','0',0,'[{\"name\":\"image\\/20220101\\/3fa2e4fe045239162cfd137518aa560c.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220101\\/3fa2e4fe045239162cfd137518aa560c.jpg\",\"a\":0,\"b\":0,\"uid\":1640968657321,\"status\":\"success\"}]','Die Lichttechnik bezieht sich auf das Design, die Technologie und die Technik der Verwendung von natürlichem Licht oder künstlichem Beleuchtungssystem, um die Beleuchtungsanforderungen in einer bestimmten Lichtumgebung zu erfüllen. Die Lichtanforderungen umfassen vor allem die Leuchtkraft, Helligkeit, die Farbwiedergabe der beleuchteten Oberfläche und die optische Wirkung der Lichtumgebung. Die Beleuchtung umfasst Innen- und Außenbereich wie Straßen, Plätze, malerische Plätze, Parks und Gebäude. Die Arbeitsweise der Lichttechnik ist im Allgemeinen: Der Lichtingenieur führt eine Reihe von Tätigkeiten durch, wie z.B. Beleuchtungstechnik-Installation, Inbetriebnahme und Abnahme durch Lichtdesign. Die Lichttechnik hat nicht nur die Funktion der Beleuchtung, sondern auch die Schönheit der städtischen Umgebung. Mit der Entwicklung von Sozialwissenschaft und Technologie sind LED-Lampen immer beliebter in der Lichttechnik. Durch seine energiesparende, hohe Helligkeit, eine reiche Farbe und eine starke Steuerbarkeit werden LED in der Lichttechnik weit verbreitet eingesetzt. In der frühen 2009, um die Inlandsnachfrage zu erweitern, die Entwicklung der chinesischen LED-Industrie zu fördern und den Energieverbrauch zu verringern, startete China s Ministerium für Wissenschaft und Technologie & ldquo; Zehn Städte und zehntausend Laternen Das Demonstrationsprogramm für Halbleiterbeleuchtung umfasst 21-entwickelte Städte wie Peking, Shanghai, Shenzhen und Wuhan. Im April 2009 startete das Ministerium für Wissenschaft und Technologie & ldquo; Zehn Städte und zehntausend Laternen Pilotprojekt für das Projekt der Halbleiterbeleuchtung. Um den Fortschritt jeder Pilotstadt weiter zu verstehen und die nächste Stufe & ldquo zu unterstützen; Zehn Städte und zehntausend Laternen Die von der Hochtechnologie- und Innovationsabteilung des Ministeriums für Wissenschaft und Technologie beauftragte nationale Allianz für Halbleiterbeleuchtung und -technologie plant, die Pilotarbeit für die Anwendungstechnik von Halbleiterbeleuchtung von Juli bis September 2010 durchzuführen; Zehn Städte und zehntausend Laternen Analysieren und untersuchen Sie den Fortschritt der Pilotarbeit in Pilotstädten.','',0.00,0.00,0.00,0,'',0,'[]','1640968689','master','de','[[],[\"88\"],[\"红\"],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[\"小\"],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,11,'[[],[],[],[],[],[],[],[],[],[]]'),(25,'LED серия источников света X100','LED серия источников света X100','LED серия источников света X100','LED серия источников света X100','0',0,'[{\"name\":\"image\\/20220101\\/3fa2e4fe045239162cfd137518aa560c.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220101\\/3fa2e4fe045239162cfd137518aa560c.jpg\",\"a\":0,\"b\":0,\"uid\":1640968657321,\"status\":\"success\"}]','под осветительными работами понимаются такие дисциплины, как проектирование, техника и инженерное дело, в которых используются системы естественного освещения или искусственного освещения для удовлетворения потребностей в освещении в конкретной световой среде. требования, предъявляемые к освещению, касаются, в частности, освещенности, яркости, яркости и визуальных эффектов световой среды. световая среда включает пространство внутри комнаты и дороги, площадь, живописные зоны, парки, здания и другие внешние помещения. Программа работы по освещению обычно: проектировщик осветительных работ через дизайн освещения, технический персонал проводит монтаж осветительных работ, наладку, приемку и другие виды деятельности. освещение имеет как функциональное освещение, так и более качественное воздействие на городскую среду. с развитием социальной науки и техники светодиодные лампы все шире используются в осветительных работах. его энергосбережение, высокая яркость, насыщенность цветом, высокая управляемость и т.д. В начале 2009 г. в целях расширения внутреннего спроса, стимулирования развития отрасли LED в китае, сокращения энергопотребления, министерство науки и техники КНР запустило & ldquo; & rdquo; демонстрационная городская Программа применения полупроводникового освещения, охватывающая 21 развитый город страны: пекин, шанхай, шэньчжэнь и ухань. в апреле 2009 г. & ldquo; & rdquo; экспериментальная работа по применению полупроводникового освещения. в целях получения более подробной информации о ходе работы в экспериментальных городах поддерживает следующий этап & ldquo; & rdquo; пилотная работа по применению полупроводникового освещения, Национальный союз по исследованию и разработке полупроводниковых осветительных приборов и промышленности по поручению высшего и нового Департамента министерства науки и техники, в июле - сентябре 2010 года; & rdquo; в экспериментальном городе проводится анализ и исследование хода осуществления экспериментальных проектов.','',0.00,0.00,0.00,0,'',3,'[]','1640968689','master','ru','[[],[\"88\"],[\"红\"],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[\"小\"],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,11,'[[],[],[],[],[],[],[],[],[],[]]'),(26,'LED engineering lighting LED engineering lighting x802','X802X802X802X802','X802X802X802X802','X802X802X802X802','0',0,'[{\"name\":\"image\\/20220103\\/a91ac1366df61aaab5514591d08f9230.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220103\\/a91ac1366df61aaab5514591d08f9230.jpg\",\"a\":0,\"b\":0,\"uid\":1641169339873,\"status\":\"success\"}]','Lighting engineering refers to the design, technology and engineering of using natural light or artificial lighting system to meet the lighting requirements in specific light environment. The lighting requirements mainly include the illuminance, brightness, color rendering of the illuminated surface and the visual effect of the light environment. The lighting environment includes indoor space and outdoor space such as roads, squares, scenic spots, parks and buildings. The working procedure of lighting engineering is generally: the lighting engineering designer carries out a series of activities such as lighting engineering installation, commissioning and acceptance through lighting design. Lighting engineering not only has the function of lighting, but also beautifies the urban environment. With the development of social science and technology, LED lamps are more and more popular in lighting engineering. Its energy-saving, high brightness, rich color and strong controllability make LED widely used in lighting engineering. In early 2009, in order to expand domestic demand, promote the development of China\'s LED industry and reduce energy consumption, China\'s Ministry of science and Technology launched & ldquo; Ten cities and ten thousand lanterns & rdquo; Semiconductor lighting application demonstration city scheme, which covers 21 domestic developed cities such as Beijing, Shanghai, Shenzhen and Wuhan. In April 2009, the Ministry of science and Technology launched & ldquo; Ten cities and ten thousand lanterns & rdquo; Pilot work of semiconductor lighting application project. In order to further understand the work progress of each pilot city and support the next stage & ldquo; Ten cities and ten thousand lanterns & rdquo; The national semiconductor lighting engineering R & D and Industry Alliance, entrusted by the high technology and innovation Department of the Ministry of science and technology, plans to carry out the pilot work of semiconductor lighting application engineering from July to September 2010; Ten cities and ten thousand lanterns & rdquo; Analyze and investigate the progress of pilot work in pilot cities.','',0.00,0.00,0.00,0,'',11,'[]','1641169352','master','en','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,12,'[[],[],[],[],[],[],[],[],[],[]]'),(27,'أدى المشروع الإضاءة أدى المشروع الإضاءة','x802x802x802x802','x802x802x802x802','x802x802x802x802','0',0,'[{\"name\":\"image\\/20220103\\/a91ac1366df61aaab5514591d08f9230.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220103\\/a91ac1366df61aaab5514591d08f9230.jpg\",\"a\":0,\"b\":0,\"uid\":1641169339873,\"status\":\"success\"}]','هندسة الإضاءة يشير إلى استخدام الضوء الطبيعي أو الاصطناعي نظام الإضاءة لتلبية متطلبات الإضاءة في ضوء البيئة المحددة في التصميم والتكنولوجيا والهندسة . متطلبات الإضاءة تشمل الإضاءة ، السطوع ، اللون ، تأثير مرئي من ضوء البيئة . الإضاءة البيئة بما في ذلك الفضاء الداخلي والطرق والساحات والمناظر الطبيعية الخلابة والحدائق والمباني وغيرها من الأماكن في الهواء الطلق . هندسة الإضاءة إجراءات العمل عموما : الإضاءة مهندس تصميم الإضاءة ، والموظفين التقنيين في تركيب الإضاءة ، والتكليف ، وقبول عدد من الأنشطة . هندسة الإضاءة ليس فقط وظيفة الإضاءة ، ولكن أيضا وظيفة تجميل البيئة الحضرية . جنبا إلى جنب مع تطور العلم والتكنولوجيا ، وتطبيق الصمام مصباح في هندسة الإضاءة أصبحت أكثر وأكثر شعبية . الصمام يستخدم على نطاق واسع في هندسة الإضاءة بسبب توفير الطاقة ، سطوع عالية ، والألوان الغنية وقوية التحكم . في أوائل عام 2009 ، من أجل توسيع الطلب المحلي ، وتعزيز التنمية في الصين صناعة الصمام ، والحد من استهلاك الطاقة ، وزارة العلوم والتكنولوجيا في الصين أطلقت &quot ; عشرة آلاف مدينة أشباه الموصلات الإضاءة تطبيق برنامج المدينة النموذجية ، التي تغطي بكين وشانغهاى وشنتشن ، ووهان ، وغيرها من المدن المتقدمة المحلية 21 . في نيسان / أبريل 2009 ، أطلقت وزارة العلوم والتكنولوجيا &quot ; عشرة آلاف مدينة أشباه الموصلات الإضاءة تطبيق المشروع التجريبي . \" دعم المرحلة المقبلة من أجل فهم أفضل للتقدم المحرز في مختلف المدن الرائدة . عشرة آلاف مدينة أشباه الموصلات الإضاءة تطبيق المشروع التجريبي ، أشباه الموصلات الإضاءة الوطنية مشروع البحث والتطوير والصناعة التحالف بتكليف من وزارة العلوم والتكنولوجيا قاو شين ، في تموز / يوليه - أيلول / سبتمبر 2010 إلى &quot ; عشرة آلاف مدينة تحليل و تحقيق التقدم المحرز في العمل التجريبي في المدن التجريبية .','',0.00,0.00,0.00,0,'',3,'[]','1641169352','master','ara','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,12,'[[],[],[],[],[],[],[],[],[],[]]'),(28,'Iluminação LED engenharia LED iluminação x802','X802X802X802X802','X802X802X802X802','X802X802X802X802','0',0,'[{\"name\":\"image\\/20220103\\/a91ac1366df61aaab5514591d08f9230.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220103\\/a91ac1366df61aaab5514591d08f9230.jpg\",\"a\":0,\"b\":0,\"uid\":1641169339873,\"status\":\"success\"}]','Engenharia de iluminação refere-se ao projeto, tecnologia e engenharia de usar luz natural ou sistema de iluminação artificial para cumprir os requisitos de iluminação em ambiente de luz específico. Os requisitos de iluminação incluem principalmente a iluminação, brilho, renderização de cores da superfície iluminada e o efeito visual do ambiente de luz. O ambiente de iluminação inclui espaço interior e espaço exterior, tais como estradas, praças, pontos turísticos, parques e edifícios. O procedimento de trabalho da engenharia de iluminação é geralmente: o projetista de engenharia de iluminação realiza uma série de atividades, tais como instalação de engenharia de iluminação, comissionamento e aceitação através de design de iluminação. A engenharia de iluminação não só tem a função de iluminação, mas também embeleza o ambiente urbano. Com o desenvolvimento da ciência social e tecnologia, lâmpadas LED são cada vez mais populares na engenharia de iluminação. Sua economia de energia, alta luminosidade, cor rica e forte controle tornam o LED amplamente usado em engenharia de iluminação. No in ício do período 2009, a fim de aumentar a procura interna, promover o desenvolvimento da indústria de LED da China e reduzir o consumo de energia, o Ministério da Ciência e Tecnologia da China lançou &ldquo; Dez cidades e dez mil lanternas &rdquo; Esquema de demonstração de aplicação de iluminação semicondutor da cidade, que abrange 21 cidades desenvolvidas no mercado interno, como Pequim, Xangai, Shenzhen e Wuhan. Em Abril 2009, o Ministério da Ciência e Tecnologia lançou o &ldquo; Dez cidades e dez mil lanternas &rdquo; Trabalhos-piloto do projecto de aplicação de iluminação de semicondutores. A fim de compreender melhor o progresso do trabalho de cada cidade-piloto e apoiar a próxima etapa &ldquo; Dez cidades e dez mil lanternas &rdquo; A engenharia nacional de iluminação de semicondutores R&D e Industry Alliance, confiada pelo Departamento de Alta Tecnologia e Inovação do Ministério da Ciência e Tecnologia, planeia realizar o trabalho piloto da engenharia de aplicações de iluminação de semicondutores de Julho a Setembro 2010; Dez cidades e dez mil lanternas &rdquo; Analisar e investigar o progresso do trabalho piloto nas cidades-piloto.','',0.00,0.00,0.00,0,'',1,'[]','1641169352','master','pt','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,12,'[[],[],[],[],[],[],[],[],[],[]]'),(29,'Iluminación de ingeniería LED iluminación de ingeniería LED x802','X802x802x802x802x802','X802x802x802x802x802','X802x802x802x802x802','0',0,'[{\"name\":\"image\\/20220103\\/a91ac1366df61aaab5514591d08f9230.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220103\\/a91ac1366df61aaab5514591d08f9230.jpg\",\"a\":0,\"b\":0,\"uid\":1641169339873,\"status\":\"success\"}]','La ingeniería de iluminación se refiere al diseño, la tecnología y la disciplina de ingeniería que utiliza la luz natural o el sistema de iluminación artificial para satisfacer los requisitos de iluminación en un entorno de iluminación específico. Los requisitos de iluminación incluyen principalmente la iluminación de la superficie iluminada, la luminancia, el color y el efecto visual del entorno de luz. El entorno de iluminación incluye el espacio interior y el espacio exterior, como carreteras, plazas, lugares escénicos, parques y edificios. El procedimiento de trabajo del proyecto de iluminación es generalmente: el diseñador del proyecto de iluminación a través del diseño de iluminación, el personal técnico lleva a cabo la instalación del proyecto de iluminación, depuración, aceptación y otras actividades. El proyecto de iluminación no sólo tiene la función de iluminación funcional, sino que también embellece el medio ambiente urbano. Con el desarrollo de la Ciencia y la tecnología, las lámparas LED se utilizan cada vez más ampliamente en la ingeniería de iluminación. Sus características de ahorro de energía, alto brillo, color rico y fuerte controlabilidad hacen que el LED se aplique ampliamente en la ingeniería de iluminación. A principios de 2009, con el fin de ampliar la demanda interna, promover el desarrollo de la industria LED en China y reducir el consumo de energía, el Ministerio de Ciencia y tecnología de China puso en marcha ldquo; Diez ciudades y diez mil calendarios & rdquo; El programa de ciudades de demostración para aplicaciones de iluminación de semiconductores abarca 21 ciudades desarrolladas en China, como Beijing, Shanghai, Shenzhen y Wuhan. En abril de 2009, el Ministerio de Ciencia y tecnología puso en marcha ldquo; Diez ciudades y diez mil calendarios & rdquo; Proyecto piloto de iluminación de semiconductores. Con el fin de comprender mejor el progreso de la labor en las ciudades piloto, se apoyó la siguiente etapa: ldquo; Diez ciudades y diez mil calendarios & rdquo; El proyecto piloto de aplicación de iluminación de semiconductores, la investigación y el desarrollo del proyecto nacional de iluminación de semiconductores y la Alianza de la industria, encargado por el Departamento de Ciencia y tecnología de Gaoxin del Ministerio de Ciencia y tecnología, se llevarán a cabo de julio a septiembre de 2010. Diez ciudades y diez mil calendarios & rdquo; Analizar e investigar el progreso del trabajo piloto en las ciudades piloto.','',0.00,0.00,0.00,0,'',2,'[]','1641169352','master','spa','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,12,'[[],[],[],[],[],[],[],[],[],[]]'),(30,'LED Engineering Beleuchtung LED Engineering Beleuchtung x802','X802X802X802X802','X802X802X802X802','X802X802X802X802','0',0,'[{\"name\":\"image\\/20220103\\/a91ac1366df61aaab5514591d08f9230.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220103\\/a91ac1366df61aaab5514591d08f9230.jpg\",\"a\":0,\"b\":0,\"uid\":1641169339873,\"status\":\"success\"}]','Die Lichttechnik bezieht sich auf das Design, die Technologie und die Technik der Verwendung von natürlichem Licht oder künstlichem Beleuchtungssystem, um die Beleuchtungsanforderungen in einer bestimmten Lichtumgebung zu erfüllen. Die Lichtanforderungen umfassen vor allem die Leuchtkraft, Helligkeit, die Farbwiedergabe der beleuchteten Oberfläche und die optische Wirkung der Lichtumgebung. Die Beleuchtung umfasst Innen- und Außenbereich wie Straßen, Plätze, malerische Plätze, Parks und Gebäude. Die Arbeitsweise der Lichttechnik ist im Allgemeinen: Der Lichtingenieur führt eine Reihe von Tätigkeiten durch, wie z.B. Beleuchtungstechnik-Installation, Inbetriebnahme und Abnahme durch Lichtdesign. Die Lichttechnik hat nicht nur die Funktion der Beleuchtung, sondern auch die Schönheit der städtischen Umgebung. Mit der Entwicklung von Sozialwissenschaft und Technologie sind LED-Lampen immer beliebter in der Lichttechnik. Durch seine energiesparende, hohe Helligkeit, eine reiche Farbe und eine starke Steuerbarkeit werden LED in der Lichttechnik weit verbreitet eingesetzt. In der frühen 2009, um die Inlandsnachfrage zu erweitern, die Entwicklung der chinesischen LED-Industrie zu fördern und den Energieverbrauch zu verringern, startete China s Ministerium für Wissenschaft und Technologie & ldquo; Zehn Städte und zehntausend Laternen Das Demonstrationsprogramm für Halbleiterbeleuchtung umfasst 21-entwickelte Städte wie Peking, Shanghai, Shenzhen und Wuhan. Im April 2009 startete das Ministerium für Wissenschaft und Technologie & ldquo; Zehn Städte und zehntausend Laternen Pilotprojekt für das Projekt der Halbleiterbeleuchtung. Um den Fortschritt jeder Pilotstadt weiter zu verstehen und die nächste Stufe & ldquo zu unterstützen; Zehn Städte und zehntausend Laternen Die von der Hochtechnologie- und Innovationsabteilung des Ministeriums für Wissenschaft und Technologie beauftragte nationale Allianz für Halbleiterbeleuchtung und -technologie plant, die Pilotarbeit für die Anwendungstechnik von Halbleiterbeleuchtung von Juli bis September 2010 durchzuführen; Zehn Städte und zehntausend Laternen Analysieren und untersuchen Sie den Fortschritt der Pilotarbeit in Pilotstädten.','',0.00,0.00,0.00,0,'',1,'[]','1641169352','master','de','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,12,'[[],[],[],[],[],[],[],[],[],[]]'),(31,'LED инженерное освещение','X802X802X802','X802X802X802','X802X802X802','0',0,'[{\"name\":\"image\\/20220103\\/a91ac1366df61aaab5514591d08f9230.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220103\\/a91ac1366df61aaab5514591d08f9230.jpg\",\"a\":0,\"b\":0,\"uid\":1641169339873,\"status\":\"success\"}]','под осветительными работами понимаются такие дисциплины, как проектирование, техника и инженерное дело, в которых используются системы естественного освещения или искусственного освещения для удовлетворения потребностей в освещении в конкретной световой среде. требования, предъявляемые к освещению, касаются, в частности, освещенности, яркости, яркости и визуальных эффектов световой среды. световая среда включает пространство внутри комнаты и дороги, площадь, живописные зоны, парки, здания и другие внешние помещения. Программа работы по освещению обычно: проектировщик осветительных работ через дизайн освещения, технический персонал проводит монтаж осветительных работ, наладку, приемку и другие виды деятельности. освещение имеет как функциональное освещение, так и более качественное воздействие на городскую среду. с развитием социальной науки и техники светодиодные лампы все шире используются в осветительных работах. его энергосбережение, высокая яркость, насыщенность цветом, высокая управляемость и т.д. В начале 2009 г. в целях расширения внутреннего спроса, стимулирования развития отрасли LED в китае, сокращения энергопотребления, министерство науки и техники КНР запустило & ldquo; & rdquo; демонстрационная городская Программа применения полупроводникового освещения, охватывающая 21 развитый город страны: пекин, шанхай, шэньчжэнь и ухань. в апреле 2009 г. & ldquo; & rdquo; экспериментальная работа по применению полупроводникового освещения. в целях получения более подробной информации о ходе работы в экспериментальных городах поддерживает следующий этап & ldquo; & rdquo; пилотная работа по применению полупроводникового освещения, Национальный союз по исследованию и разработке полупроводниковых осветительных приборов и промышленности по поручению высшего и нового Департамента министерства науки и техники, в июле - сентябре 2010 года; & rdquo; в экспериментальном городе проводится анализ и исследование хода осуществления экспериментальных проектов.','',0.00,0.00,0.00,0,'',2,'[]','1641169352','master','ru','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,12,'[[],[],[],[],[],[],[],[],[],[]]'),(32,'LED engineering lighting x99','LED engineering lighting x99led engineering lighting x99','LED engineering lighting x99led engineering lighting x99','LED engineering lighting x99led engineering lighting x99','0',0,'[{\"name\":\"image\\/20220103\\/2d8eae23bb4ab78469c26471130076dd.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220103\\/2d8eae23bb4ab78469c26471130076dd.jpg\",\"a\":0,\"b\":0,\"uid\":1641169441453,\"status\":\"success\"}]','In early 2009, in order to expand domestic demand, promote the development of China\'s LED industry and reduce energy consumption, China\'s Ministry of science and Technology launched & ldquo; Ten cities and ten thousand lanterns & rdquo; Semiconductor lighting application demonstration city scheme, which covers 21 domestic developed cities such as Beijing, Shanghai, Shenzhen and Wuhan. In April 2009, the Ministry of science and Technology launched & ldquo; Ten cities and ten thousand lanterns & rdquo; Pilot work of semiconductor lighting application project. In order to further understand the work progress of each pilot city and support the next stage & ldquo; Ten cities and ten thousand lanterns & rdquo; The national semiconductor lighting engineering R & D and Industry Alliance, entrusted by the high technology and innovation Department of the Ministry of science and technology, plans to carry out the pilot work of semiconductor lighting application engineering from July to September 2010; Ten cities and ten thousand lanterns & rdquo; Analyze and investigate the progress of pilot work in pilot cities.','',0.00,0.00,0.00,0,NULL,4,'[]','1641169453','master','en','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,13,'[[],[],[],[],[],[],[],[],[],[]]'),(33,'أدى الإضاءة الهندسية X99','أدى المشروع الإضاءة أدى المشروع الإضاءة','أدى المشروع الإضاءة أدى المشروع الإضاءة','أدى المشروع الإضاءة أدى المشروع الإضاءة','0',0,'[{\"name\":\"image\\/20220103\\/2d8eae23bb4ab78469c26471130076dd.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220103\\/2d8eae23bb4ab78469c26471130076dd.jpg\",\"a\":0,\"b\":0,\"uid\":1641169441453,\"status\":\"success\"}]','في أوائل عام 2009 ، من أجل توسيع الطلب المحلي ، وتعزيز التنمية في الصين صناعة الصمام ، والحد من استهلاك الطاقة ، وزارة العلوم والتكنولوجيا في الصين أطلقت &quot ; عشرة آلاف مدينة أشباه الموصلات الإضاءة تطبيق برنامج المدينة النموذجية ، التي تغطي بكين وشانغهاى وشنتشن ، ووهان ، وغيرها من المدن المتقدمة المحلية 21 . في نيسان / أبريل 2009 ، أطلقت وزارة العلوم والتكنولوجيا &quot ; عشرة آلاف مدينة أشباه الموصلات الإضاءة تطبيق المشروع التجريبي . \" دعم المرحلة المقبلة من أجل فهم أفضل للتقدم المحرز في مختلف المدن الرائدة . عشرة آلاف مدينة أشباه الموصلات الإضاءة تطبيق المشروع التجريبي ، أشباه الموصلات الإضاءة الوطنية مشروع البحث والتطوير والصناعة التحالف بتكليف من وزارة العلوم والتكنولوجيا قاو شين ، في تموز / يوليه - أيلول / سبتمبر 2010 إلى &quot ; عشرة آلاف مدينة تحليل و تحقيق التقدم المحرز في العمل التجريبي في المدن التجريبية .','',0.00,0.00,0.00,0,NULL,0,'[]','1641169453','master','ara','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,13,'[[],[],[],[],[],[],[],[],[],[]]'),(34,'Iluminação LED x99','Iluminação de engenharia LED','Iluminação de engenharia LED','Iluminação de engenharia LED','0',0,'[{\"name\":\"image\\/20220103\\/2d8eae23bb4ab78469c26471130076dd.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220103\\/2d8eae23bb4ab78469c26471130076dd.jpg\",\"a\":0,\"b\":0,\"uid\":1641169441453,\"status\":\"success\"}]','No in ício do período 2009, a fim de aumentar a procura interna, promover o desenvolvimento da indústria de LED da China e reduzir o consumo de energia, o Ministério da Ciência e Tecnologia da China lançou &ldquo; Dez cidades e dez mil lanternas &rdquo; Esquema de demonstração de aplicação de iluminação semicondutor da cidade, que abrange 21 cidades desenvolvidas no mercado interno, como Pequim, Xangai, Shenzhen e Wuhan. Em Abril 2009, o Ministério da Ciência e Tecnologia lançou o &ldquo; Dez cidades e dez mil lanternas &rdquo; Trabalhos-piloto do projecto de aplicação de iluminação de semicondutores. A fim de compreender melhor o progresso do trabalho de cada cidade-piloto e apoiar a próxima etapa &ldquo; Dez cidades e dez mil lanternas &rdquo; A engenharia nacional de iluminação de semicondutores R&D e Industry Alliance, confiada pelo Departamento de Alta Tecnologia e Inovação do Ministério da Ciência e Tecnologia, planeia realizar o trabalho piloto da engenharia de aplicações de iluminação de semicondutores de Julho a Setembro 2010; Dez cidades e dez mil lanternas &rdquo; Analisar e investigar o progresso do trabalho piloto nas cidades-piloto.','',0.00,0.00,0.00,0,NULL,0,'[]','1641169453','master','pt','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,13,'[[],[],[],[],[],[],[],[],[],[]]'),(35,'Iluminación de ingeniería LED x99','Iluminación de ingeniería LED x99 iluminación de ingeniería LED x99','Iluminación de ingeniería LED x99 iluminación de ingeniería LED x99','Iluminación de ingeniería LED x99 iluminación de ingeniería LED x99','0',0,'[{\"name\":\"image\\/20220103\\/2d8eae23bb4ab78469c26471130076dd.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220103\\/2d8eae23bb4ab78469c26471130076dd.jpg\",\"a\":0,\"b\":0,\"uid\":1641169441453,\"status\":\"success\"}]','A principios de 2009, con el fin de ampliar la demanda interna, promover el desarrollo de la industria LED en China y reducir el consumo de energía, el Ministerio de Ciencia y tecnología de China puso en marcha ldquo; Diez ciudades y diez mil calendarios & rdquo; El programa de ciudades de demostración para aplicaciones de iluminación de semiconductores abarca 21 ciudades desarrolladas en China, como Beijing, Shanghai, Shenzhen y Wuhan. En abril de 2009, el Ministerio de Ciencia y tecnología puso en marcha ldquo; Diez ciudades y diez mil calendarios & rdquo; Proyecto piloto de iluminación de semiconductores. Con el fin de comprender mejor el progreso de la labor en las ciudades piloto, se apoyó la siguiente etapa: ldquo; Diez ciudades y diez mil calendarios & rdquo; El proyecto piloto de aplicación de iluminación de semiconductores, la investigación y el desarrollo del proyecto nacional de iluminación de semiconductores y la Alianza de la industria, encargado por el Departamento de Ciencia y tecnología de Gaoxin del Ministerio de Ciencia y tecnología, se llevarán a cabo de julio a septiembre de 2010. Diez ciudades y diez mil calendarios & rdquo; Analizar e investigar el progreso del trabajo piloto en las ciudades piloto.','',0.00,0.00,0.00,0,NULL,0,'[]','1641169453','master','spa','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,13,'[[],[],[],[],[],[],[],[],[],[]]'),(36,'LED Engineering Beleuchtung x99','LED Engineering Beleuchtung x99led Engineering Beleuchtung x99','LED Engineering Beleuchtung x99led Engineering Beleuchtung x99','LED Engineering Beleuchtung x99led Engineering Beleuchtung x99','0',0,'[{\"name\":\"image\\/20220103\\/2d8eae23bb4ab78469c26471130076dd.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220103\\/2d8eae23bb4ab78469c26471130076dd.jpg\",\"a\":0,\"b\":0,\"uid\":1641169441453,\"status\":\"success\"}]','In der frühen 2009, um die Inlandsnachfrage zu erweitern, die Entwicklung der chinesischen LED-Industrie zu fördern und den Energieverbrauch zu verringern, startete China s Ministerium für Wissenschaft und Technologie & ldquo; Zehn Städte und zehntausend Laternen Das Demonstrationsprogramm für Halbleiterbeleuchtung umfasst 21-entwickelte Städte wie Peking, Shanghai, Shenzhen und Wuhan. Im April 2009 startete das Ministerium für Wissenschaft und Technologie & ldquo; Zehn Städte und zehntausend Laternen Pilotprojekt für das Projekt der Halbleiterbeleuchtung. Um den Fortschritt jeder Pilotstadt weiter zu verstehen und die nächste Stufe & ldquo zu unterstützen; Zehn Städte und zehntausend Laternen Die von der Hochtechnologie- und Innovationsabteilung des Ministeriums für Wissenschaft und Technologie beauftragte nationale Allianz für Halbleiterbeleuchtung und -technologie plant, die Pilotarbeit für die Anwendungstechnik von Halbleiterbeleuchtung von Juli bis September 2010 durchzuführen; Zehn Städte und zehntausend Laternen Analysieren und untersuchen Sie den Fortschritt der Pilotarbeit in Pilotstädten.','',0.00,0.00,0.00,0,NULL,0,'[]','1641169453','master','de','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,13,'[[],[],[],[],[],[],[],[],[],[]]'),(37,'LED инженерное освещение X99','LED инженерное освещение X99LED инженерное освещение X99','LED инженерное освещение X99LED инженерное освещение X99','LED инженерное освещение X99LED инженерное освещение X99','0',0,'[{\"name\":\"image\\/20220103\\/2d8eae23bb4ab78469c26471130076dd.jpg\",\"url\":\"http:\\/\\/waimao.admin.erdaicms.com\\/uploads\\/image\\/20220103\\/2d8eae23bb4ab78469c26471130076dd.jpg\",\"a\":0,\"b\":0,\"uid\":1641169441453,\"status\":\"success\"}]','В начале 2009 г. в целях расширения внутреннего спроса, стимулирования развития отрасли LED в китае, сокращения энергопотребления, министерство науки и техники КНР запустило & ldquo; & rdquo; демонстрационная городская Программа применения полупроводникового освещения, охватывающая 21 развитый город страны: пекин, шанхай, шэньчжэнь и ухань. в апреле 2009 г. & ldquo; & rdquo; экспериментальная работа по применению полупроводникового освещения. в целях получения более подробной информации о ходе работы в экспериментальных городах поддерживает следующий этап & ldquo; & rdquo; пилотная работа по применению полупроводникового освещения, Национальный союз по исследованию и разработке полупроводниковых осветительных приборов и промышленности по поручению высшего и нового Департамента министерства науки и техники, в июле - сентябре 2010 года; & rdquo; в экспериментальном городе проводится анализ и исследование хода осуществления экспериментальных проектов.','',0.00,0.00,0.00,0,NULL,0,'[]','1641169453','master','ru','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]','[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]','[[],[],[],[],[],[],[],[],[],[]]','1',NULL,13,'[[],[],[],[],[],[],[],[],[],[]]');
/*!40000 ALTER TABLE `erdai_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_product_attribute`
--

DROP TABLE IF EXISTS `erdai_product_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_product_attribute` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `time` varchar(20) DEFAULT NULL,
  `admin_user` varchar(20) DEFAULT NULL,
  `lang` varchar(10) DEFAULT NULL,
  `weight` int(5) DEFAULT '100',
  `name` varchar(200) DEFAULT NULL,
  `shuxing` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_product_attribute`
--

LOCK TABLES `erdai_product_attribute` WRITE;
/*!40000 ALTER TABLE `erdai_product_attribute` DISABLE KEYS */;
INSERT INTO `erdai_product_attribute` VALUES (2,'1638604012','master','zh',0,'色系','[{\"name\":\"\\u989c\\u8272\",\"value\":\"\\u7ea2\\n\\u9ec4\\n\\u84dd\\n\\u7d2b\",\"type\":\"1\",\"weight\":\"0\",\"value_array\":[\"\\u7ea2\\n\\u9ec4\\n\\u84dd\"]},{\"name\":\"\\u5927\\u5c0f\",\"value\":\"\\u5c0f\\n\\u4e2d\\n\\u5927\",\"type\":\"2\",\"weight\":\"4\",\"value_array\":[\"\\u5c0f\\n\\u4e2d\\n\\u5927\"]}]'),(3,'1636163301','master','zh',0,'型号','[{\"name\":\"\\u578b\\u53f7\",\"value\":\"88\\n99\\n11\\nxx\\nzz\",\"type\":\"1\",\"weight\":\"\"}]'),(5,'1636188237','master','zh',0,'安装说明','[{\"name\":\"\\u5b89\\u88c5\\u8bf4\\u660e\",\"value\":\"\",\"type\":\"3\",\"weight\":\"5\"}]');
/*!40000 ALTER TABLE `erdai_product_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_product_classify`
--

DROP TABLE IF EXISTS `erdai_product_classify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_product_classify` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(220) DEFAULT NULL,
  `seo_title` varchar(220) DEFAULT NULL,
  `keyword` varchar(220) DEFAULT NULL,
  `description` varchar(240) DEFAULT NULL,
  `parent` int(5) DEFAULT '0' COMMENT '上级分类',
  `weight` int(5) DEFAULT '0',
  `admin_user` varchar(30) DEFAULT '0',
  `time` int(12) DEFAULT NULL,
  `lang` varchar(20) DEFAULT NULL,
  `delete_time` varchar(20) DEFAULT '1',
  `image` text,
  `fanyi_from_id` int(12) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_product_classify`
--

LOCK TABLES `erdai_product_classify` WRITE;
/*!40000 ALTER TABLE `erdai_product_classify` DISABLE KEYS */;
INSERT INTO `erdai_product_classify` VALUES (16,'LED光源系列','LED光源系列','','',0,0,'master',1640968047,'zh','1','[]',0),(17,' LED商业照明',' LED商业照明','\nLED商业照明','\nLED商业照明',0,0,'master',1641182391,'zh','1','[]',0),(18,'LED工程照明','LED工程照明','LED工程照明','',0,0,'master',1641182413,'zh','1','[]',0),(19,' LED驱动电源',' LED驱动电源','\nLED驱动电源','\nLED驱动电源',0,0,'master',1641182431,'zh','1','[]',0),(20,'LED driving power supply','LED driving power supply','LED driving power supply','LED driving power supply',0,0,'master',1641182431,'en','1','[]',19),(21,'قاد السلطة','قاد السلطة','قاد السلطة','قاد السلطة',0,0,'master',1641182431,'ara','1','[]',19),(22,'Fornecimento de energia de condução LED','Fornecimento de energia de condução LED','Fornecimento de energia de condução LED','Fornecimento de energia de condução LED',0,0,'master',1641182431,'pt','1','[]',19),(23,'Fuente de alimentación de conducción LED','Fuente de alimentación de conducción LED','Fuente de alimentación de conducción LED','Fuente de alimentación de conducción LED',0,0,'master',1641182431,'spa','1','[]',19),(24,'Stromversorgung mit LED','Stromversorgung mit LED','Stromversorgung mit LED','Stromversorgung mit LED',0,0,'master',1641182431,'de','1','[]',19),(25,'источник питания','источник питания','источник питания','источник питания',0,0,'master',1641182431,'ru','1','[]',19),(26,'rrrrrrrrrr','','','',19,0,'master',1641609657,'zh','1','[]',0),(27,'sasd','','','',19,0,'master',1641876423,'zh','1','[]',0),(28,'4444','','','',19,0,'master',1641876454,'zh','1','[]',0);
/*!40000 ALTER TABLE `erdai_product_classify` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_project_declare`
--

DROP TABLE IF EXISTS `erdai_project_declare`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_project_declare` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `time` varchar(20) DEFAULT NULL,
  `admin_user` varchar(20) DEFAULT NULL,
  `weight` int(5) DEFAULT '0',
  `title` varchar(220) DEFAULT NULL,
  `jsxz` varchar(220) DEFAULT NULL,
  `jsdd` varchar(220) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `county` varchar(50) DEFAULT NULL,
  `kgnf` varchar(20) DEFAULT NULL,
  `jcnf` varchar(20) DEFAULT NULL,
  `jsjj` varchar(220) DEFAULT NULL,
  `tzlb` varchar(220) DEFAULT NULL,
  `tzje` varchar(220) DEFAULT NULL,
  `xmdw` varchar(220) DEFAULT NULL,
  `xmzzrxm` varchar(220) DEFAULT NULL,
  `xmzzezw` varchar(220) DEFAULT NULL,
  `xmzzrdh` varchar(220) DEFAULT NULL,
  `rcjgdw` varchar(220) DEFAULT NULL,
  `rcjgdrdwjrrzw` varchar(220) DEFAULT NULL,
  `rcjgd` varchar(220) DEFAULT NULL,
  `rdwjrrdh` varchar(220) DEFAULT NULL,
  `status` int(5) DEFAULT '0' COMMENT '状态0待申报，1申报待领导审核，2待市局审核，3待实施',
  `lang` varchar(10) DEFAULT NULL,
  `rcjgzrdwzrrxm` varchar(220) DEFAULT NULL,
  `rcjgdrdwjrrdh` varchar(50) DEFAULT NULL,
  `department_rules` varchar(100) DEFAULT '0' COMMENT '所属部门ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_project_declare`
--

LOCK TABLES `erdai_project_declare` WRITE;
/*!40000 ALTER TABLE `erdai_project_declare` DISABLE KEYS */;
/*!40000 ALTER TABLE `erdai_project_declare` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_project_declare_log`
--

DROP TABLE IF EXISTS `erdai_project_declare_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_project_declare_log` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `admin_user` varchar(30) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `project_id` int(12) DEFAULT NULL,
  `content` varchar(200) DEFAULT NULL,
  `status` int(5) DEFAULT NULL COMMENT '操作标识',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_project_declare_log`
--

LOCK TABLES `erdai_project_declare_log` WRITE;
/*!40000 ALTER TABLE `erdai_project_declare_log` DISABLE KEYS */;
INSERT INTO `erdai_project_declare_log` VALUES (1,'master','1635651278',5,'申报成功',NULL),(2,'zhangsan','1635728571',4,'申报成功',1),(3,'master','1635733705',5,'8888',2),(4,'master','1635733866',5,'888',5),(5,'master','1635986784',4,'123',5),(6,'master','1635986794',3,'申报成功',1),(7,'wangwu','1635987741',3,'123321',5);
/*!40000 ALTER TABLE `erdai_project_declare_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_project_detailed`
--

DROP TABLE IF EXISTS `erdai_project_detailed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_project_detailed` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `project_id` int(12) DEFAULT NULL,
  `admin_user` varchar(30) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `zjbf` varchar(100) DEFAULT NULL,
  `tzwcl` varchar(30) DEFAULT NULL,
  `zfzj` varchar(100) DEFAULT NULL,
  `zfwcl` varchar(30) DEFAULT NULL,
  `xxjd` int(10) DEFAULT NULL,
  `beizhu` text,
  `lang` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_project_detailed`
--

LOCK TABLES `erdai_project_detailed` WRITE;
/*!40000 ALTER TABLE `erdai_project_detailed` DISABLE KEYS */;
/*!40000 ALTER TABLE `erdai_project_detailed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_roles`
--

DROP TABLE IF EXISTS `erdai_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_roles` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) DEFAULT NULL,
  `biaozhi` varchar(30) DEFAULT NULL,
  `menu` text,
  `description` varchar(220) DEFAULT NULL,
  `weight` int(5) DEFAULT '0',
  `time` varchar(12) DEFAULT NULL,
  `admin_user` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_roles`
--

LOCK TABLES `erdai_roles` WRITE;
/*!40000 ALTER TABLE `erdai_roles` DISABLE KEYS */;
INSERT INTO `erdai_roles` VALUES (2,'农业农村市局','admin','[6,8,7,3,5,4,1,2,18,9,17]','市',0,'1636360768','master'),(3,'农业农村县局','xian','[6,8,7,13,15,14,10,12,11,9,18]','县管理',0,'1636360653','master');
/*!40000 ALTER TABLE `erdai_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_rules_btn`
--

DROP TABLE IF EXISTS `erdai_rules_btn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_rules_btn` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `value` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_rules_btn`
--

LOCK TABLES `erdai_rules_btn` WRITE;
/*!40000 ALTER TABLE `erdai_rules_btn` DISABLE KEYS */;
INSERT INTO `erdai_rules_btn` VALUES (1,'添加','create'),(2,'审核','check'),(3,'编辑','edit'),(4,'删除','delete'),(5,'导出','exit'),(6,'导入','import'),(7,'申报立项','post'),(8,'翻译','fanyi');
/*!40000 ALTER TABLE `erdai_rules_btn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_siteinfo`
--

DROP TABLE IF EXISTS `erdai_siteinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_siteinfo` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `keyword` varchar(200) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `open` int(5) DEFAULT '1',
  `logo` varchar(100) DEFAULT NULL,
  `html` text,
  `cdn` varchar(255) DEFAULT NULL,
  `lang` varchar(20) DEFAULT NULL,
  `type` int(5) DEFAULT NULL,
  `close_text` varchar(220) DEFAULT NULL,
  `order_open` int(5) DEFAULT '1',
  `message_open` int(5) DEFAULT '1',
  `icpnumber` varchar(30) DEFAULT NULL,
  `cachetime` int(8) DEFAULT '0',
  `auto_area` int(5) DEFAULT '0' COMMENT '自动IP识别',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_siteinfo`
--

LOCK TABLES `erdai_siteinfo` WRITE;
/*!40000 ALTER TABLE `erdai_siteinfo` DISABLE KEYS */;
INSERT INTO `erdai_siteinfo` VALUES (1,'外贸CMS演示站','外贸CMS、外贸网站CMS、外贸网站模板、外贸网站系统','外贸CMS专业的外贸建站系统',1,'/uploads/image/20211231/23524912510.png','','http://waimao.admin.erdaicms.com','zh',1,'禁止查看',0,1,NULL,0,1),(2,'外贸CMS管理系统',NULL,NULL,1,'/uploads/image/20211104/14401312982.png','','http://localhost:9527/','zh',2,NULL,1,1,NULL,0,0),(6,'Foreign trade CMS management system',NULL,NULL,1,'/uploads/image/20211104/14401312982.png','',NULL,'en',2,NULL,1,1,NULL,0,0),(7,'التجارة الخارجية نظام إدارة سم',NULL,NULL,1,'/uploads/image/20211104/14401312982.png','',NULL,'ara',2,NULL,1,1,NULL,0,0),(9,'Foreign trade CMS demonstration station','Foreign trade CMS, foreign trade website CMS, foreign trade website template, foreign trade website system','Foreign trade CMS professional foreign trade station building system',1,'/uploads/image/20211231/23524912510.png','','http://waimao.admin.erdaicms.com','en',1,'Disable viewing',1,1,NULL,0,0),(10,NULL,NULL,NULL,1,NULL,NULL,NULL,'tr',2,NULL,1,1,NULL,0,0),(11,NULL,NULL,NULL,1,NULL,NULL,NULL,'tr',1,NULL,1,1,NULL,0,0),(12,'اتفاقية الأنواع المهاجرة مظاهرة محطة التجارة الخارجية','اتفاقية الأنواع المهاجرة ، اتفاقية الأنواع المهاجرة ، اتفاقية الأنواع المهاجرة ، اتفاقية الأنواع المهاجرة ، اتفاقية الأنواع المهاجرة ، اتفاقية الأنواع المهاجرة','نظام التجارة الخارجية CMS',1,'/uploads/image/20211231/23524912510.png','','http://waimao.admin.erdaicms.com','ara',1,'حظر عرض',1,1,NULL,0,0),(13,'Estação de demonstração CMS do comércio externo','CMS de comércio externo, CMS site de comércio externo, modelo de site de comércio externo, sistema de website de comércio externo','Comércio externo CMS sistema profissional de construção de estações de comércio externo',1,'/uploads/image/20211231/23524912510.png','','http://waimao.admin.erdaicms.com','pt',1,'Desabilitar visualização',1,1,NULL,0,0),(14,'Foreign Trade CMS demonstration Station','CMS de comercio exterior, CMS de comercio exterior, plantillas de sitios web de comercio exterior, sistema de sitios web de comercio exterior','Sistema de construcción de estaciones de comercio exterior para la especialidad de comercio exterior CMS',1,'/uploads/image/20211231/23524912510.png','','http://waimao.admin.erdaicms.com','spa',1,'Desactivar vista',1,1,NULL,0,0),(15,'Vorführstation des Außenhandels CMS','Außenhandel CMS, Website des Außenhandels CMS, Website des Außenhandels, Website Vorlage des Außenhandels, Website System des Außenhandels','Außenhandel CMS professionelle Aussenhandelsbahngebäude System',1,'/uploads/image/20211231/23524912510.png','','http://waimao.admin.erdaicms.com','de',1,'Anzeige deaktivieren',1,1,NULL,0,0),(16,'демонстрационная станция CMS внешней торговли','СМС внешнеторговый сайт CMS, шаблоны внешнеторговых веб - сайтов, система внешнеторговых веб - сайтов','СМС специализированная система внешнеторговых станций',1,'/uploads/image/20211231/23524912510.png','','http://waimao.admin.erdaicms.com','ru',1,'смотреть запрещено',1,1,NULL,0,0),(17,NULL,NULL,NULL,1,NULL,NULL,NULL,'ru',2,NULL,1,1,NULL,0,0),(18,NULL,NULL,NULL,1,NULL,NULL,NULL,'spa',2,NULL,1,1,NULL,0,0),(19,NULL,NULL,NULL,1,NULL,NULL,NULL,'de',2,NULL,1,1,NULL,0,0),(20,NULL,NULL,NULL,1,NULL,NULL,NULL,'pt',2,NULL,1,1,NULL,0,0);
/*!40000 ALTER TABLE `erdai_siteinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_visitor_message`
--

DROP TABLE IF EXISTS `erdai_visitor_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_visitor_message` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `companyname` varchar(80) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `name` varchar(80) DEFAULT NULL,
  `tel` varchar(80) DEFAULT NULL,
  `content` text,
  `content_id` int(11) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `ip` varchar(20) DEFAULT NULL,
  `status` int(5) DEFAULT '0',
  `lang` varchar(30) DEFAULT NULL,
  `image` varchar(250) DEFAULT NULL,
  `admin_user` varchar(30) DEFAULT NULL,
  `reback_content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_visitor_message`
--

LOCK TABLES `erdai_visitor_message` WRITE;
/*!40000 ALTER TABLE `erdai_visitor_message` DISABLE KEYS */;
INSERT INTO `erdai_visitor_message` VALUES (2,'asdsads000','szdasdasds@163.com','0000','0000','00000',5,'2021-12-14 14:41:36','127.0.0.1',0,'zh','[]','master','');
/*!40000 ALTER TABLE `erdai_visitor_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erdai_visitor_order`
--

DROP TABLE IF EXISTS `erdai_visitor_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erdai_visitor_order` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erdai_visitor_order`
--

LOCK TABLES `erdai_visitor_order` WRITE;
/*!40000 ALTER TABLE `erdai_visitor_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `erdai_visitor_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'waimao_demo_erda'
--

--
-- Dumping routines for database 'waimao_demo_erda'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-11 14:06:40
