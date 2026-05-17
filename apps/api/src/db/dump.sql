-- MySQL dump 10.13  Distrib 8.4.9, for Linux (x86_64)
--
-- Host: localhost    Database: portfolio
-- ------------------------------------------------------
-- Server version	8.4.9

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `__drizzle_migrations`
--

DROP TABLE IF EXISTS `__drizzle_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__drizzle_migrations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `hash` text NOT NULL,
  `created_at` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__drizzle_migrations`
--

LOCK TABLES `__drizzle_migrations` WRITE;
/*!40000 ALTER TABLE `__drizzle_migrations` DISABLE KEYS */;
INSERT INTO `__drizzle_migrations` VALUES (1,'8a1628f5abab050d6575f9da48459601cc41bb3f0e6d5e604204576f70b86b85',1776781809612),(2,'88c8cd1463802c3e49b4c8e9554b1d2be8d6ca9e1e87e35d86337be2781aa745',1778984346172),(3,'45a82ae6ffc2adfbb8fcd751c67a4b5e254835004a7dc229bb4dd8cf5651713d',1779023215764);
/*!40000 ALTER TABLE `__drizzle_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `components`
--

DROP TABLE IF EXISTS `components`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `components` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(160) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `type` varchar(60) NOT NULL DEFAULT 'registry:component',
  `dependencies` json DEFAULT (_utf8mb4'[]'),
  `registry_dependencies` json DEFAULT (_utf8mb4'[]'),
  `files` json DEFAULT (_utf8mb4'[]'),
  `tags` json DEFAULT (_utf8mb4'[]'),
  `preview` varchar(1000) DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT '1',
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `components_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `components`
--

LOCK TABLES `components` WRITE;
/*!40000 ALTER TABLE `components` DISABLE KEYS */;
INSERT INTO `components` VALUES (1,'tube-cursor','Tube Cursor','A tube-cursor component.','registry:component','[]','[]','[{\"path\": \"src/components/ui/tube-cursor.tsx\", \"type\": \"registry:component\", \"content\": \"// components/TubesCursor.tsx\\n\\\"use client\\\";\\n\\nimport { useEffect, useRef } from \\\"react\\\";\\n\\ntype TubesCursorProps = {\\n  title?: string;\\n  subtitle?: string;\\n  caption?: string;\\n  initialColors?: string[];   // tubes base colors\\n  lightColors?: string[];     // lights colors\\n  lightIntensity?: number;    // lights intensity\\n  titleSize?: string;         // Tailwind text size classes\\n  subtitleSize?: string;\\n  captionSize?: string;\\n  enableRandomizeOnClick?: boolean;\\n  className?: string;         // extra classes for wrapper\\n};\\n\\nconst TubesCursor = ({\\n  title = \\\"Tubes\\\",\\n  subtitle = \\\"Cursor\\\",\\n  caption = \\\"WebGPU / WebGL\\\",\\n  initialColors = [\\\"#f967fb\\\", \\\"#53bc28\\\", \\\"#6958d5\\\"],\\n  lightColors = [\\\"#83f36e\\\", \\\"#fe8a2e\\\", \\\"#ff008a\\\", \\\"#60aed5\\\"],\\n  lightIntensity = 200,\\n  titleSize = \\\"text-[80px]\\\",\\n  subtitleSize = \\\"text-[60px]\\\",\\n  captionSize = \\\"text-base\\\",\\n  enableRandomizeOnClick = true,\\n  className = \\\"\\\",\\n}: TubesCursorProps) => {\\n  const canvasRef = useRef<HTMLCanvasElement | null>(null);\\n  const appRef = useRef<any>(null);\\n\\n  useEffect(() => {\\n    let removeClick: (() => void) | null = null;\\n    let destroyed = false;\\n\\n    (async () => {\\n      const mod = await import(\\n        /* webpackIgnore: true */\\n        \\\"https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js\\\"\\n      );\\n      const TubesCursorCtor = (mod as any).default ?? mod;\\n\\n      if (!canvasRef.current || destroyed) return;\\n\\n      const app = TubesCursorCtor(canvasRef.current, {\\n        tubes: {\\n          colors: initialColors,\\n          lights: {\\n            intensity: lightIntensity,\\n            colors: lightColors,\\n          },\\n        },\\n      });\\n\\n      appRef.current = app;\\n\\n      if (enableRandomizeOnClick) {\\n        const handler = () => {\\n          const colors = randomColors(initialColors.length);\\n          const lights = randomColors(lightColors.length);\\n          app.tubes.setColors(colors);\\n          app.tubes.setLightsColors(lights);\\n        };\\n        document.body.addEventListener(\\\"click\\\", handler);\\n        removeClick = () =>\\n          document.body.removeEventListener(\\\"click\\\", handler);\\n      }\\n    })();\\n\\n    return () => {\\n      destroyed = true;\\n      if (removeClick) removeClick();\\n      try {\\n        appRef.current?.dispose?.();\\n        appRef.current = null;\\n      } catch {\\n        // ignore\\n      }\\n    };\\n  }, [initialColors, lightColors, lightIntensity, enableRandomizeOnClick]);\\n\\n  return (\\n    <div className={`relative h-screen w-screen overflow-hidden ${className}`}>\\n      {/* Background canvas */}\\n      <canvas ref={canvasRef} className=\\\"fixed inset-0 block h-full w-full\\\" />\\n\\n      {/* Hero text */}\\n      <div className=\\\"relative z-10 flex h-full w-full flex-col items-center justify-center gap-2 select-none\\\">\\n        <h1\\n          className={`m-0 p-0 text-white font-bold uppercase leading-none drop-shadow-[0_0_20px_rgba(0,0,0,1)] ${titleSize}`}\\n        >\\n          {title}\\n        </h1>\\n        <h2\\n          className={`m-0 p-0 text-white font-medium uppercase leading-none drop-shadow-[0_0_20px_rgba(0,0,0,1)] ${subtitleSize}`}\\n        >\\n          {subtitle}\\n        </h2>\\n        <p\\n          className={`m-0 p-0 text-white leading-none drop-shadow-[0_0_20px_rgba(0,0,0,1)] ${captionSize}`}\\n        >\\n          {caption}\\n        </p>\\n      </div>\\n    </div>\\n  );\\n};\\n\\nfunction randomColors(count: number) {\\n  return new Array(count).fill(0).map(\\n    () =>\\n      \\\"#\\\" +\\n      Math.floor(Math.random() * 16777215)\\n        .toString(16)\\n        .padStart(6, \\\"0\\\")\\n  );\\n}\\n\\nexport { TubesCursor };\\n\"}]','[\"cursor\", \"webgl\"]',NULL,1,0,'2026-05-17 13:09:43','2026-05-17 13:09:43');
/*!40000 ALTER TABLE `components` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `subject` varchar(300) DEFAULT NULL,
  `message` text NOT NULL,
  `status` enum('new','read','archived') NOT NULL DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiences`
--

DROP TABLE IF EXISTS `experiences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experiences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company` varchar(200) NOT NULL,
  `role` varchar(200) NOT NULL,
  `location` varchar(200) DEFAULT NULL,
  `description` text,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `current` tinyint(1) NOT NULL DEFAULT '0',
  `order` int NOT NULL DEFAULT '0',
  `is_published` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiences`
--

LOCK TABLES `experiences` WRITE;
/*!40000 ALTER TABLE `experiences` DISABLE KEYS */;
INSERT INTO `experiences` VALUES (3,'Tuffy Studio','Freelance Developer','Mexico City, Mexico (Remote)',NULL,'2023-10-01',NULL,1,1,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(4,'adagio','UI Design','Santiago de Chile (Remote)',NULL,'2023-04-01',NULL,1,2,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(5,'Davivienda','Web Developer','Colombia (Remote)',NULL,'2022-01-01','2023-03-01',0,3,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(6,'SaveFood Store','Web UI Design','Guatemala (Remote)',NULL,'2021-11-01','2022-05-01',0,4,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(7,'Entrekids','Frontend Developer','Santiago de Chile (On-Site)','Interfaces responsive con HTML5, CSS3 y JavaScript, mejorando la UX y aumentando conversiones. Integración de APIs de terceros para pagos online y recomendaciones. Gestión de contenidos según el feedback de usuarios.','2019-08-01',NULL,1,5,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(8,'Punto Data','UX/UI Designer / Front End Developer','Santiago de Chile (On-Site)','Supervisión de equipos de ingeniería con metodología Shape Up para una plataforma educativa. Colaboración con stakeholders, product managers y clientes. Priorización del roadmap para entregar en tres meses.','2019-05-01','2021-01-01',0,6,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(9,'Criptovision','Frontend Developer / Product Design','Colombia (Remote)','Interfaces para aplicaciones basadas en blockchain. Experiencias intuitivas para plataformas DeFi. Contribución a la definición de productos web3.','2018-09-01','2019-05-01',0,7,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(10,'Platzi','UI Design','Colombia (Remote)','Interfaces claras y atractivas. Prototipos detallados para pruebas previas al desarrollo. Investigación de usuarios y priorización de características.','2017-06-01','2018-11-01',0,8,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(11,'EdTeam','UI/UX Design','Perú (Remote)','Interfaces intuitivas para la plataforma educativa. Flujos de aprendizaje optimizados. Diseño adaptable a móvil y tablet con Figma y Adobe XD.','2017-01-01','2018-09-01',0,9,1,'2026-05-16 19:01:28','2026-05-16 19:01:28');
/*!40000 ALTER TABLE `experiences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `summary` varchar(500) DEFAULT NULL,
  `description` text,
  `content` text,
  `cover_image` varchar(500) DEFAULT NULL,
  `images` json DEFAULT (_utf8mb4'[]'),
  `tags` json DEFAULT (_utf8mb4'[]'),
  `stack` json DEFAULT (_utf8mb4'[]'),
  `link_live` varchar(500) DEFAULT NULL,
  `link_repo` varchar(500) DEFAULT NULL,
  `client` varchar(200) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_best` tinyint(1) NOT NULL DEFAULT '0',
  `is_published` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `projects_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (21,'Butacas','butacas','Navigate the world of web technology',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/butacas/1778983199985-f4adebf0-cover.png','[]','[\"Web App\"]','[]','https://josbert2.github.io/teas/',NULL,NULL,NULL,1,1,1,'2026-05-17 02:00:00','2026-05-17 02:00:00'),(22,'Stylo','stylo','Editor de código en vivo con preview en tiempo real',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/stylo/1778983200749-39af2fc5-cover.png','[]','[\"Web App\"]','[]',NULL,NULL,NULL,NULL,2,1,1,'2026-05-17 02:00:01','2026-05-17 02:00:01'),(23,'Entrekids','entrekids','Marketplace para actividades infantiles',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/entrekids/1778983201295-ff0b06dd-cover.webp','[]','[\"Web App\"]','[]',NULL,NULL,NULL,NULL,3,0,1,'2026-05-17 02:00:01','2026-05-17 02:00:01'),(24,'Bookforce','bookforce','Software para tu negocio de entretenimiento',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/bookforce/1778983201834-24486448-cover.webp','[]','[\"Web App\"]','[]','https://www.bookforce.io/',NULL,NULL,NULL,4,0,1,'2026-05-17 02:00:02','2026-05-17 02:00:02'),(25,'Criptovision','criptovision','End-to-end Blockchain Services',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/criptovision/1778983202348-c288af54-cover.webp','[]','[\"Web 3 App\"]','[]','https://criptovision.com/',NULL,NULL,NULL,5,0,1,'2026-05-17 02:00:03','2026-05-17 02:00:03'),(26,'MILL','mill','Con el propósito de dar respuesta a las necesidades y demandas de la Industria Metalúrgica y Metalmecánica.',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/mill/1778983203069-95bbb888-cover.webp','[]','[\"Landing Page\"]','[]','https://josbert2.github.io/Mill/','https://github.com/josbert2/Mill',NULL,NULL,6,0,1,'2026-05-17 02:00:03','2026-05-17 02:00:03'),(27,'Template App','template-app','Landing pages para app de productos',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/template-app/1778983203581-c743bb99-cover.webp','[]','[\"Web App\"]','[]','https://josbert2.github.io/product/','https://github.com/josbert2/product',NULL,NULL,7,0,1,'2026-05-17 02:00:04','2026-05-17 02:00:04'),(28,'Solo Llantas','solo-llantas','Landing page para un sitio de venta de llantas',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/solo-llantas/1778983204086-d95c5fc7-cover.webp','[]','[\"Web App\"]','[]','https://josbert2.github.io/llanta/shop.html','https://github.com/josbert2/llanta',NULL,NULL,8,0,1,'2026-05-17 02:00:04','2026-05-17 02:00:04'),(29,'Motoo Apartaments','motoo-apartaments','Landing page para apartamentos, hoteles y casas',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/motoo-apartaments/1778983204676-6afb9aea-cover.webp','[]','[\"Web App\"]','[]','https://josbert2.github.io/edificio/','https://github.com/josbert2/edificio',NULL,NULL,9,0,1,'2026-05-17 02:00:05','2026-05-17 02:00:05'),(30,'Piazza','piazza','We would like to welcome you to Little Piazza Bar & Grill',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/piazza/1778983205180-303094ac-cover.webp','[]','[\"Web App\"]','[]','https://josbert2.github.io/piazza/','https://github.com/josbert2/piazza',NULL,NULL,10,0,1,'2026-05-17 02:00:05','2026-05-17 02:00:05'),(31,'Babarrun','babarrun','Landing page de panoramas',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/babarrun/1778983205739-efd2fca1-cover.webp','[]','[\"Web App\"]','[]','https://josbert2.github.io/babarrun/','https://github.com/josbert2/babarrun',NULL,NULL,11,0,1,'2026-05-17 02:00:06','2026-05-17 02:00:06'),(32,'PAAGSA','paagsa','PAAGSA, una empresa 100% mexicana con más de 100 años en la industria de las Artes Gráficas.',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/paagsa/1778983206283-44a95d71-cover.webp','[]','[\"Web App\"]','[]','https://josbert2.github.io/mascarillas/','https://github.com/josbert2/mascarillas',NULL,NULL,12,0,1,'2026-05-17 02:00:06','2026-05-17 02:00:06'),(33,'VIRUS','virus','Virus que ya se han ido y virus que llegarán.',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/virus/1778983206801-5ab08020-cover.webp','[]','[\"Web App\"]','[]','https://josbert2.github.io/virus/','https://github.com/josbert2/virus',NULL,NULL,13,0,1,'2026-05-17 02:00:07','2026-05-17 02:00:07'),(34,'Pixie','pixie','Landing page para un ecommerce de productos para mascotas',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/pixie/1778983207328-69d82c44-cover.webp','[]','[\"Web App\"]','[]','https://josbert2.github.io/pet/','https://github.com/josbert2/pet',NULL,NULL,14,0,1,'2026-05-17 02:00:07','2026-05-17 02:00:07'),(35,'UOH','uoh','Landing page para la Universidad UOH',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/uoh/1778983207836-7d610e82-cover.webp','[]','[\"Web App\"]','[]','https://josbert2.github.io/uoh/','https://github.com/josbert2/uoh',NULL,NULL,15,0,1,'2026-05-17 02:00:08','2026-05-17 02:00:08'),(36,'Rest 911','rest-911','Navigate the world of web technology',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/rest-911/1778983208344-c78f5082-cover.webp','[]','[\"Web App\"]','[]','https://josbert2.github.io/res-workana/',NULL,NULL,NULL,16,0,1,'2026-05-17 02:00:11','2026-05-17 02:00:11'),(37,'Davivienda','davivienda','Landing page para el banco Davivienda',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/davivienda/1778983211625-e0ce9ff2-cover.webp','[]','[\"Web App\"]','[]','https://josbert2.github.io/repowork/',NULL,NULL,NULL,17,0,1,'2026-05-17 02:00:12','2026-05-17 02:00:12'),(38,'Savefood','savefood','Iniciativa para reducir el excedente de alimentos generado por los restaurantes',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/savefood/1778983212126-544cab04-cover.webp','[]','[\"Web App\"]','[]','https://josbert2.github.io/savefood/',NULL,NULL,NULL,18,0,1,'2026-05-17 02:00:12','2026-05-17 02:00:12'),(39,'Black Coffee','black-coffee','Navigate the world of web technology',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/black-coffee/1778983212980-f1b5ecd6-cover.webp','[]','[\"Web App\"]','[]','https://josbert2.github.io/teas/',NULL,NULL,NULL,19,0,1,'2026-05-17 02:00:13','2026-05-17 02:00:13'),(40,'ADAGIOS TEAS','adagios-teas','Natural Teas',NULL,NULL,'https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/projects/adagios-teas/1778983213495-60fde72f-cover.webp','[]','[\"Web App\"]','[]','https://adagio-zeta.vercel.app/','https://github.com/josbert2/adagio',NULL,NULL,20,0,1,'2026-05-17 02:00:14','2026-05-17 02:00:14');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resource_categories`
--

DROP TABLE IF EXISTS `resource_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resource_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `slug` varchar(120) NOT NULL,
  `color` varchar(32) DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `resource_categories_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resource_categories`
--

LOCK TABLES `resource_categories` WRITE;
/*!40000 ALTER TABLE `resource_categories` DISABLE KEYS */;
INSERT INTO `resource_categories` VALUES (1,'Componentes','componentes-92rl2','oklch(0.55 0.16 290)',0,'2026-05-17 02:29:31'),(2,'Landings','landings-1ldau','oklch(0.62 0.14 215)',1,'2026-05-17 02:29:31'),(3,'Herramientas','herramientas-43z4k','oklch(0.62 0.14 155)',2,'2026-05-17 02:29:31');
/*!40000 ALTER TABLE `resource_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resources`
--

DROP TABLE IF EXISTS `resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resources` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(1000) NOT NULL,
  `title` varchar(300) NOT NULL,
  `description` text,
  `thumbnail` varchar(1000) DEFAULT NULL,
  `favicon` varchar(1000) DEFAULT NULL,
  `tags` json DEFAULT (_utf8mb4'[]'),
  `category_id` int DEFAULT NULL,
  `notes` text,
  `is_favorite` tinyint(1) NOT NULL DEFAULT '0',
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resources`
--

LOCK TABLES `resources` WRITE;
/*!40000 ALTER TABLE `resources` DISABLE KEYS */;
INSERT INTO `resources` VALUES (1,'https://21st.dev/','21st.dev',NULL,NULL,NULL,'[]',1,NULL,1,0,'2026-05-17 02:29:43','2026-05-17 02:29:43'),(2,'https://linear.app/','Linear – The system for product development','Purpose-built for planning and building products with AI agents.','https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/resources/1778984985102-6d446b36-shot.png','https://linear.app/static/apple-touch-icon.png?v=2','[]',2,NULL,1,0,'2026-05-17 02:29:45','2026-05-17 02:52:32'),(3,'https://vercel.com/','Vercel: Build and deploy the best web experiences with the AI Cloud – Vercel','Vercel gives developers the frameworks, workflows, and infrastructure to build a faster, more personalized web.','https://pub-9ff94ab4fd8b48b686a07b9d1d1c3019.r2.dev/resources/1778984986690-3a7cc0cf-shot.png','https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/apple-touch-icon-256x256.png','[]',2,NULL,0,0,'2026-05-17 02:29:47','2026-05-17 02:29:47');
/*!40000 ALTER TABLE `resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `category` varchar(120) DEFAULT NULL,
  `level` int NOT NULL DEFAULT '0',
  `icon` varchar(500) DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_published` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (4,'HTML / CSS / JS','Web Development',95,NULL,1,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(5,'React','Web Development',92,NULL,2,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(6,'Next.js','Web Development',92,NULL,3,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(7,'TailwindCSS','Web Development',90,NULL,4,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(8,'Astro','Web Development',85,NULL,5,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(9,'Node.js','Web Development',85,NULL,6,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(10,'Radix UI','Web Development',82,NULL,7,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(11,'Vue','Web Development',80,NULL,8,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(12,'Nest.js','Web Development',80,NULL,9,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(13,'PostgreSQL','Web Development',80,NULL,10,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(14,'GraphQL','Web Development',78,NULL,11,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(15,'Prisma','Web Development',78,NULL,12,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(16,'Strapi','Web Development',75,NULL,13,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(17,'Golang','Web Development',65,NULL,14,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(18,'User Interfaces','Industria',92,NULL,15,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(19,'User Experience','Industria',90,NULL,16,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(20,'Product Design','Industria',88,NULL,17,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(21,'Wireframing','Industria',86,NULL,18,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(22,'SaaS','Industria',82,NULL,19,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(23,'Marketing Sites','Industria',80,NULL,20,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(24,'Figma','Herramientas',93,NULL,21,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(25,'Webflow','Herramientas',80,NULL,22,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(26,'CloudFlare','Herramientas',75,NULL,23,1,'2026-05-16 19:01:28','2026-05-16 19:01:28'),(27,'Docker','Herramientas',72,NULL,24,1,'2026-05-16 19:01:28','2026-05-16 19:01:28');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(190) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(120) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'hola@bookforce.io','$2a$10$YDECyodPSB8sd2pfWqVKaOKZ8Ff5QJi9BTzQ5EwuS5VZOqJD6m7Yy','Admin','2026-05-16 15:56:30','2026-05-16 15:56:30');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
