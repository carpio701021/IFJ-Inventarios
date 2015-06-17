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
-- Create schema sdan001
--

CREATE DATABASE IF NOT EXISTS sdan001;
USE sdan001;

--
-- Definition of table `op_t_conceptos`
--

DROP TABLE IF EXISTS `op_t_conceptos`;
CREATE TABLE `op_t_conceptos` (
  `PK` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Codigo del Movimiento',
  `Descripcion` char(60) NOT NULL DEFAULT '' COMMENT 'Descripcion',
  `Tipo` char(1) NOT NULL DEFAULT 'S' COMMENT 'Tipo (E=Entrada / S=Salida)',
  `Cuenta_Contable` char(10) NOT NULL DEFAULT '' COMMENT 'Cuenta Contable',
  `Comentarios` char(100) NOT NULL DEFAULT '' COMMENT 'Comentarios',
  `Estado` char(1) NOT NULL DEFAULT 'I' COMMENT 'Estado (A=Activo / I=Inactivo)',
  PRIMARY KEY (`PK`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Conceptos para operaciones del inventario';

--
-- Dumping data for table `op_t_conceptos`
--

/*!40000 ALTER TABLE `op_t_conceptos` DISABLE KEYS */;
/*!40000 ALTER TABLE `op_t_conceptos` ENABLE KEYS */;


--
-- Definition of table `op_t_grupos`
--

DROP TABLE IF EXISTS `op_t_grupos`;
CREATE TABLE `op_t_grupos` (
  `Codigo` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Codigo del Grupo',
  `Descripcion` char(60) NOT NULL DEFAULT '' COMMENT 'Descripcion del Grupo',
  `Cuenta_Contable` char(10) NOT NULL DEFAULT '' COMMENT 'Codigo de Cuenta Contable',
  `Estado` char(1) NOT NULL DEFAULT 'I' COMMENT 'Estado (A=Activo / I=Inactivo)',
  PRIMARY KEY (`Codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Maestro de Grupo de ITEMS';

--
-- Dumping data for table `op_t_grupos`
--

/*!40000 ALTER TABLE `op_t_grupos` DISABLE KEYS */;
INSERT INTO `op_t_grupos` (`Codigo`,`Descripcion`,`Cuenta_Contable`,`Estado`) VALUES 
 (70,'Prueba','','A'),
 (80,'Nuevo Grupo','','A');
/*!40000 ALTER TABLE `op_t_grupos` ENABLE KEYS */;


--
-- Definition of table `op_t_items`
--

DROP TABLE IF EXISTS `op_t_items`;
CREATE TABLE `op_t_items` (
  `FK_Grupo` int(10) unsigned NOT NULL COMMENT 'Codigo de Grupo',
  `Codigo` int(10) unsigned NOT NULL COMMENT 'Codigo del Item',
  `Descripcion` char(60) NOT NULL DEFAULT '' COMMENT 'Descripcion del Item',
  `Codigo_Barras` char(20) NOT NULL DEFAULT '' COMMENT 'Codigo de Barras',
  `Cuenta_Contable` char(10) NOT NULL DEFAULT '' COMMENT 'Cuenta Contable',
  `Tipo` char(1) NOT NULL DEFAULT 'P' COMMENT 'Tipo (P=Producto / S=Servicio)',
  `Unidad_Medida` char(20) NOT NULL DEFAULT 'UNIDAD' COMMENT 'Unidad de Medida de VENTA',
  `Precio_Costo` decimal(10,4) NOT NULL DEFAULT '0.0000' COMMENT 'Precio de Costo',
  `Precio_Venta` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT 'Precio de Venta',
  `Existencia` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Existencia',
  PRIMARY KEY (`FK_Grupo`,`Codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Items para la Venta';

--
-- Dumping data for table `op_t_items`
--

/*!40000 ALTER TABLE `op_t_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `op_t_items` ENABLE KEYS */;


--
-- Definition of table `op_t_log_transacciones`
--

DROP TABLE IF EXISTS `op_t_log_transacciones`;
CREATE TABLE `op_t_log_transacciones` (
  `Pk` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Codigo Interno',
  `Fecha` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'Fecha y Hora de acceso',
  `Codigo_Usuario` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Codigo del Usuario que Procesa',
  `Ip` varchar(40) NOT NULL DEFAULT ' ' COMMENT 'IP',
  `Transaccion` varchar(60) NOT NULL DEFAULT ' ' COMMENT 'Nombre de la Tabla',
  `Operacion` varchar(60) NOT NULL DEFAULT ' ' COMMENT 'Operacion a Realizar',
  `Data_Before` varchar(800) NOT NULL DEFAULT ' ' COMMENT 'Datos Anteriores',
  `Data_Current` varchar(800) NOT NULL DEFAULT ' ' COMMENT 'Datos a Grabar',
  `Error_Number` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Codigo de Error',
  `Error_Message` varchar(80) NOT NULL DEFAULT ' ' COMMENT 'Mensaje de Error',
  PRIMARY KEY (`Pk`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='Log de Transacciones';

--
-- Dumping data for table `op_t_log_transacciones`
--

/*!40000 ALTER TABLE `op_t_log_transacciones` DISABLE KEYS */;
INSERT INTO `op_t_log_transacciones` (`Pk`,`Fecha`,`Codigo_Usuario`,`Ip`,`Transaccion`,`Operacion`,`Data_Before`,`Data_Current`,`Error_Number`,`Error_Message`) VALUES 
 (1,'2015-06-09 12:57:15',10,'185.125.145.30','sp_admin_op_t_grupos','UPDATE','','Nuevo Producto8080A80|',2,'NO EXISTE'),
 (2,'2015-06-09 12:57:24',10,'185.125.145.30','sp_admin_op_t_grupos','INSERT','','Nuevo Producto8080A80|',0,'Transaccion Procesada'),
 (3,'2015-06-09 12:58:05',10,'185.125.145.30','sp_admin_op_t_grupos','UPDATE','','Nuevo Grupo8080A80|',0,'Transaccion Procesada'),
 (4,'2015-06-09 12:59:55',10,'185.125.145.30','sp_admin_op_t_grupos','INSERT','','Nuevo Grupo8080A80|',23000,'Duplicate entry \'80\' for key \'PRIMARY\''),
 (5,'2015-06-09 13:15:28',10,'185.125.145.30','sp_admin_op_t_grupos','INSERT','','Nuevo Grupo8080A80|',1,'YA EXISTE'),
 (6,'2015-06-09 13:15:44',10,'185.125.145.30','sp_admin_op_t_grupos','INSERT','','Nuevo Grupo8080A80|',1,'YA EXISTE'),
 (7,'2015-06-09 13:22:46',10,'185.125.145.30','sp_admin_op_t_grupos','INSERT','Nuevo Grupo8080A80|','Nuevo Grupo8080A80|',1,'YA EXISTE');
/*!40000 ALTER TABLE `op_t_log_transacciones` ENABLE KEYS */;


--
-- Definition of procedure `sp_admin_op_t_grupos`
--

DROP PROCEDURE IF EXISTS `sp_admin_op_t_grupos`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_admin_op_t_grupos`(
p_operacion char(10),		-- DELETE, INSERT, UPDATE
p_codigo integer,
p_descripcion char(60),
p_cuenta_contable char(10), 
p_estado char(1),
p_codigo_usuario integer,
p_ip char(40)
)
BEGIN
   --
   -- Este SP procesa en la tabla 'op_t_grupos' las operaciones de DELETE, INSERT, UPDATE
   -- Devuelve:
   --                tran_error             integer     = Codigo de Error
   --                tran_mensaje           char(60)    = Mensaje de Error
   --
   -- Codigos de ERROR:
   --      0 = TODO CORRECTO
   --      1 = Codigo a trabajar YA existe (aplica para INSERT)
   --      2 = Codigo a trabajar NO existe (aplica para DELETE y UPDATE)
   --
   DECLARE lc_Fecha DATETIME;
   DECLARE lc_Error INT DEFAULT 0;
   DECLARE lc_Mensaje CHAR(60) DEFAULT 'Transaccion Procesada';
   DECLARE lc_Data_Before VARCHAR(800) DEFAULT '';
   DECLARE lc_Data_Current VARCHAR(800) DEFAULT '';
   --
   DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
      BEGIN
         GET DIAGNOSTICS CONDITION 1
             lc_Error = RETURNED_SQLSTATE, lc_Mensaje = MESSAGE_TEXT;
      END;
   --
   SET lc_Fecha = NOW();
   --
   -- Se determina la transaccion a realizar
   --
   CASE p_operacion
      WHEN 'DELETE' THEN 
         BEGIN
            --
            -- Se busca el registro a eliminar
            --
            SET lc_Data_Before = IFNULL( (SELECT CONCAT_WS(Codigo,Descripcion,Cuenta_Contable,Estado,'|') FROM op_t_grupos WHERE codigo = p_codigo),'NO EXISTE');
            IF lc_Data_Before = 'NO EXISTE' THEN
               SET lc_Error = 2;
               SET lc_Mensaje = 'NO EXISTE';
            ELSE
               DELETE FROM op_t_grupos WHERE Codigo = p_codigo;
            END IF;
         END;
      WHEN 'INSERT' THEN
         BEGIN
            --
            -- Se Verifica que NO exista el registro a agregar
            --
            SET lc_Data_Before = IFNULL( (SELECT CONCAT_WS(Codigo,Descripcion,Cuenta_Contable,Estado,'|') FROM op_t_grupos WHERE codigo = p_codigo),'');
            IF lc_Data_Before <> '' THEN
               SET lc_Error = 1;
               SET lc_Mensaje = 'YA EXISTE';
            ELSE
               INSERT INTO op_t_grupos (Codigo, Descripcion, Cuenta_Contable, Estado)
                      VALUES (p_codigo, p_descripcion, p_cuenta_contable, p_estado);
            END IF;
         END;
      WHEN 'UPDATE' THEN
         BEGIN
            --
            -- Se busca el registro a modificar
            --
            SET lc_Data_Before = IFNULL( (SELECT CONCAT_WS(Codigo,Descripcion,Cuenta_Contable,Estado,'|') FROM op_t_grupos WHERE codigo = p_codigo),'NO EXISTE');
            IF lc_Data_Before = 'NO EXISTE' THEN
               SET lc_Error = 2;
               SET lc_Mensaje = 'NO EXISTE';
            ELSE
               UPDATE op_t_grupos SET Descripcion = p_descripcion, Cuenta_Contable = p_cuenta_contable, Estado = p_estado
                  WHERE Codigo = p_codigo;
            END IF;
         END;
      ELSE
         BEGIN
         END;
   END CASE;
   --
   -- Se Graba el Log File
   --
   SET lc_Data_Current = CONCAT_WS (p_codigo, p_descripcion, p_cuenta_contable, p_estado, '|');
   --
   INSERT INTO op_t_log_transacciones (Fecha, Codigo_Usuario, Ip, Transaccion, Operacion, Data_Before, Data_Current, Error_Number, Error_Message)
                  VALUES (now(), p_codigo_usuario, p_ip, 'sp_admin_op_t_grupos', p_operacion, lc_Data_Before, lc_Data_Current, lc_error, lc_Mensaje);
   --
   -- Se devuelven los datos
   --
   SELECT lc_Error AS tran_error, lc_Mensaje AS tran_mensaje;
   --
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_get_op_t_grupos`
--

DROP PROCEDURE IF EXISTS `sp_get_op_t_grupos`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_op_t_grupos`(
p_codigo int,
p_sort char(20)
)
BEGIN
   --
   -- Este SP, devuelve informacion de los Grupos de Items definidos
   -- 
   IF LTRIM(RTRIM(p_codigo)) = 0 THEN
      IF p_sort = 'CODIGO' THEN
         SELECT * FROM op_t_grupos ORDER BY Codigo;
      ELSE
         SELECT * FROM op_t_grupos ORDER BY Descripcion;
      END IF;
   ELSE
      SELECT * FROM op_t_grupos WHERE codigo = p_codigo;
   END IF;
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
