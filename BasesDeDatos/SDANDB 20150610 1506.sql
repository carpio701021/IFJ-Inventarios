-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.7.3-m13-log


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema sdandb
--

CREATE DATABASE IF NOT EXISTS sdandb;
USE sdandb;

--
-- Definition of table `sg_t_clientes`
--

DROP TABLE IF EXISTS `sg_t_clientes`;
CREATE TABLE `sg_t_clientes` (
  `Pk` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Codigo Interno de Cliente',
  `Nit` char(20) NOT NULL DEFAULT '' COMMENT 'NIT del Cliente',
  `Nombre` char(120) NOT NULL DEFAULT '' COMMENT 'Nombre del Cliente',
  `Direccion` char(200) NOT NULL DEFAULT '' COMMENT 'Direccion',
  `DB_Server` char(100) NOT NULL DEFAULT 'localhost' COMMENT 'Servidor donde reside la Base de Datos',
  `DB_Numero` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Numero de Base de Datos',
  `Numero_Licencias` int(10) unsigned NOT NULL DEFAULT '1' COMMENT 'Numero de Liciencias adquiridas',
  `Estado` char(1) NOT NULL DEFAULT 'I' COMMENT 'Estado (A=Activo / I=Inactivo)',
  PRIMARY KEY (`Pk`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='Maestro de Clientes';

--
-- Dumping data for table `sg_t_clientes`
--

/*!40000 ALTER TABLE `sg_t_clientes` DISABLE KEYS */;
INSERT INTO `sg_t_clientes` (`Pk`,`Nit`,`Nombre`,`Direccion`,`DB_Server`,`DB_Numero`,`Numero_Licencias`,`Estado`) VALUES 
 (1,'1234567-8','Juan Perez','Ciudad','localhost',1,2,'A'),
 (2,'7654321-8','Libreria El Lapiz','4 ave 3-45 zona 5','localhost',2,3,'A'),
 (3,'112233-4','Ferreteria El Martillo','3 calle 2-11 zona 3, Mixco','localhost',3,2,'A'),
 (4,'2222222-2','Carlos Lopez','Ciudad','localhost',4,2,'I');
/*!40000 ALTER TABLE `sg_t_clientes` ENABLE KEYS */;


--
-- Definition of table `sg_t_dispositivos`
--

DROP TABLE IF EXISTS `sg_t_dispositivos`;
CREATE TABLE `sg_t_dispositivos` (
  `Pk` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Codgo Interno',
  `Fk_Cliente` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Codigo del Cliente',
  `ID` char(20) NOT NULL DEFAULT '' COMMENT 'Id del Dispositivo',
  `Estado` char(1) NOT NULL DEFAULT 'I' COMMENT 'Estado (A=Activo / I=Inactivo)',
  PRIMARY KEY (`Pk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Dispositivos utilizados por los Clientes';

--
-- Dumping data for table `sg_t_dispositivos`
--

/*!40000 ALTER TABLE `sg_t_dispositivos` DISABLE KEYS */;
/*!40000 ALTER TABLE `sg_t_dispositivos` ENABLE KEYS */;


--
-- Definition of table `sg_t_log_login`
--

DROP TABLE IF EXISTS `sg_t_log_login`;
CREATE TABLE `sg_t_log_login` (
  `Pk` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Codigo Interno',
  `Fecha_Hora` datetime NOT NULL COMMENT 'Fecha y Hora',
  `Ip` char(40) NOT NULL DEFAULT '' COMMENT 'IP',
  `Cliente` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Codigo de Cliente',
  `Usuario` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Codigo de Usuario',
  `Password` varchar(100) NOT NULL DEFAULT ' ' COMMENT 'Password',
  `Resultado` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Resultado del Login',
  PRIMARY KEY (`Pk`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='Log de Login';

--
-- Dumping data for table `sg_t_log_login`
--

/*!40000 ALTER TABLE `sg_t_log_login` DISABLE KEYS */;
INSERT INTO `sg_t_log_login` (`Pk`,`Fecha_Hora`,`Ip`,`Cliente`,`Usuario`,`Password`,`Resultado`) VALUES 
 (1,'2015-06-05 19:51:46','125.125.125.123',2,75,'Juan',3),
 (2,'2015-06-05 19:52:37','125.125.125.123',2,575,'Juan',199),
 (3,'2015-06-10 15:04:15','125.254.34.45',1,1002,'prueba',3),
 (4,'2015-06-10 15:04:36','125.254.34.45',1,1000,'prueba',199);
/*!40000 ALTER TABLE `sg_t_log_login` ENABLE KEYS */;


--
-- Definition of table `sg_t_usuarios`
--

DROP TABLE IF EXISTS `sg_t_usuarios`;
CREATE TABLE `sg_t_usuarios` (
  `Pk` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Codigo Interno',
  `Fk_Cliente` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Codigo del Cliente',
  `Codigo` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Codigo del Usuario',
  `Nombre` char(60) NOT NULL DEFAULT '' COMMENT 'Nombre del Usuario',
  `Password` char(60) NOT NULL DEFAULT '' COMMENT 'Password del Usuario',
  `Tipo` char(1) NOT NULL DEFAULT 'O' COMMENT 'Tipo (A=Administrador / O=Operativo)',
  `Estado` char(1) NOT NULL DEFAULT 'I' COMMENT 'Estado (A=Activo / I=Inactivo)',
  PRIMARY KEY (`Pk`),
  KEY `FK_sg_t_usuarios_Fk_Cliente` (`Fk_Cliente`),
  CONSTRAINT `FK_sg_t_usuarios_Fk_Cliente` FOREIGN KEY (`Fk_Cliente`) REFERENCES `sg_t_clientes` (`Pk`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='Maestro de Usuarios';

--
-- Dumping data for table `sg_t_usuarios`
--

/*!40000 ALTER TABLE `sg_t_usuarios` DISABLE KEYS */;
INSERT INTO `sg_t_usuarios` (`Pk`,`Fk_Cliente`,`Codigo`,`Nombre`,`Password`,`Tipo`,`Estado`) VALUES 
 (1,1,1000,'Juan Perez','Su Password','A','A'),
 (2,1,1001,'Carmen Garcia','Su Password','O','I'),
 (3,1,1002,'Rosa Lopez','Su Password','O','A'),
 (4,2,575,'Roberto Rosales','Su Password','A','A'),
 (5,2,75,'Operador','Su Password','O','A'),
 (6,3,100,'Jaime Porras','Su Password','A','A'),
 (7,3,101,'Carlos Lopez','Su Password','O','I'),
 (8,3,102,'Felipe Hernandez','Su Password','O','A'),
 (9,4,200,'Carmen Cita','Su Password','A','A');
/*!40000 ALTER TABLE `sg_t_usuarios` ENABLE KEYS */;


--
-- Definition of procedure `sp_tran_web_login`
--

DROP PROCEDURE IF EXISTS `sp_tran_web_login`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_tran_web_login`(
p_codigo_cliente integer,
p_codigo_usuario integer,
p_password char(10), 
p_ip char(40)
)
BEGIN
   --
   -- Este SP procesa el Login del Usuario
   -- Devuelve:
   --                login_error             integer)    = Codigo de Error
   --                login_mensaje           char(60)    = Mensaje de Error
   --                login_nombre_cliente    char(60)    = Nombre del Cliente
   --                login_usuario_nombre    char(60)    = Nombre del Usuaro
   --                login_Server            char(100)   = Nombre del Servidor donde está la Base de Datos del Cliente
   --                login_DB                integer     = Numero de la Base de Datos del Cliente
   --
   -- Codigos de ERROR:
   --  199 = TODO CORRECTO
   --    1 = Codigo de Usuario NO existe
   --    2 = Usuario INACTIVO
   --    3 = Tipo del Usuario INVALIDO (solo los usuarios administrativos pueden usar la pagina)
   --    4 = Cliente INACTIVO
   --    5 = Password INVALIDO
   --
   DECLARE lc_DB_Pk_Cliente INT DEFAULT 0;
   DECLARE lc_DB_Nombre CHAR(60) DEFAULT '';
   DECLARE lc_DB_Password CHAR(60) DEFAULT '';
   DECLARE lc_DB_Tipo CHAR(1) DEFAULT '';
   DECLARE lc_DB_Estado CHAR(1) DEFAULT '';
   DECLARE lc_Cli_DB_Estado CHAR(1) DEFAULT '';
   DECLARE lc_Cli_DB_Nombre CHAR(60) DEFAULT '';
   DECLARE lc_Cli_DB_Server CHAR(100) DEFAULT '';
   DECLARE lc_Cli_DB_Numero INT DEFAULT 0;
   DECLARE lc_Error INT default 0;
   DECLARE lc_Mensaje CHAR(60) DEFAULT '';
   --
   -- Se obtiene el password de la base de datos
   --
   SET lc_DB_Password = IFNULL((select password from sg_t_usuarios where fk_cliente = p_codigo_cliente and codigo = p_codigo_usuario), '==NO EXISTE==');
   --
   -- Se verifica la informacion
   --
   IF lc_DB_Password = '==NO EXISTE==' THEN
      BEGIN
         SET lc_Error   = 1;
         SET lc_Mensaje = 'Codigo de Usuario NO Existe';
      END;
   END IF;
   --
   -- Cuando NO hay error, se continua con el proceso
   --
   IF lc_Error = 0 THEN
      BEGIN
         SET lc_DB_Estado = IFNULL((select estado from sg_t_usuarios where fk_cliente = p_codigo_cliente and codigo = p_codigo_usuario), 'I');
         --
         -- Se verifica la informacion
         --
         IF lc_DB_Estado <> 'A' THEN
            BEGIN
               SET lc_Error   = 2;
               SET lc_Mensaje = 'Usuario INACTIVO';
            END;
         END IF;
      END;
   END IF;
   --
   -- Cuando NO hay error, se continua con el proceso
   --
   IF lc_Error = 0 THEN
      BEGIN
         SET lc_DB_Tipo = IFNULL((select tipo from sg_t_usuarios where fk_cliente = p_codigo_cliente and codigo = p_codigo_usuario), 'I');
         --
         -- Se verifica la informacion
         --
         IF lc_DB_Tipo <> 'A' THEN
            BEGIN
               SET lc_Error   = 3;
               SET lc_Mensaje = 'Tipo del Usuario INVALIDO';
            END;
         END IF;
      END;
   END IF;
   --
   -- Cuando NO hay error, se continua con el proceso
   --
   IF lc_Error = 0 THEN
      BEGIN
         SET lc_Cli_DB_Estado = IFNULL((select estado from sg_t_clientes where pk = p_codigo_cliente), 'I');
         --
         -- Se verifica la informacion
         --
         IF lc_Cli_DB_Estado <> 'A' THEN
            BEGIN
               SET lc_Error   = 4;
               SET lc_Mensaje = 'Cliente INACTIVO';
            END;
         END IF;
      END;
   END IF;
   --
   -- Cuando NO hay error, se continua con el proceso
   --
   IF lc_Error = 0 THEN
      BEGIN
         --
         -- Se decodifica el password almacenado
         --
         IF lc_DB_Password <> lc_DB_Password THEN
            BEGIN
               SET lc_Error   = 5;
               SET lc_Mensaje = 'Password INVALIDO';
            END;
         END IF;
      END;
   END IF;
   --
   -- Cuando NO hay error, se continua con el proceso
   --
   IF lc_Error = 0 THEN
      BEGIN
         SET lc_Error = 199;
         SET lc_Cli_DB_Nombre = IFNULL((select nombre from sg_t_clientes where pk = p_codigo_cliente), 'ERROR: Nombre del Cliente NO existe');
         SET lc_DB_Nombre = IFNULL((select nombre from sg_t_usuarios where fk_cliente = p_codigo_cliente and codigo = p_codigo_usuario), 'ERROR: Nombre del Usuario NO existe');
		 SET lc_Cli_DB_Server = IFNULL((select DB_Server from sg_t_clientes where pk = p_codigo_cliente), 'ERROR: Nombre del Cliente NO existe');
		 SET lc_Cli_DB_Numero = IFNULL((select DB_Numero from sg_t_clientes where pk = p_codigo_cliente), 'ERROR: Nombre del Cliente NO existe');
      END;
   END IF;
   --
   -- Se Graba el Log File
   --
   INSERT INTO sg_t_log_login (Fecha_Hora, Ip, Cliente, Usuario, Password, Resultado)
                  VALUES (now(), p_ip, p_codigo_cliente, p_codigo_usuario, p_password, lc_error);
   --
   -- Se devuelven los datos
   --
   SELECT lc_Error AS login_error, lc_mensaje AS login_mensaje, lc_Cli_DB_Nombre as login_nombre_cliente, lc_DB_Nombre AS login_usuario_nombre,
          lc_Cli_DB_Server AS login_Server, lc_Cli_DB_Numero AS login_DB;
   --
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
