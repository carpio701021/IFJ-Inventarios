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
-- Definition of table `ge_t_tablas_sincronizar`
--

DROP TABLE IF EXISTS `ge_t_tablas_sincronizar`;
CREATE TABLE `ge_t_tablas_sincronizar` (
  `PK` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Codigo Interno',
  `Nombre` char(60) NOT NULL DEFAULT '' COMMENT 'Nombre de la Tabla',
  `Fecha_Update` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'Fecha de Ac',
  PRIMARY KEY (`PK`),
  KEY `Index_Nombre` (`Nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='Maestro de Tablas a Sincronizar';

--
-- Dumping data for table `ge_t_tablas_sincronizar`
--

/*!40000 ALTER TABLE `ge_t_tablas_sincronizar` DISABLE KEYS */;
INSERT INTO `ge_t_tablas_sincronizar` (`PK`,`Nombre`,`Fecha_Update`) VALUES 
 (1,'ge_t_unidades_medida','0000-00-00 00:00:00'),
 (2,'op_t_conceptos','0000-00-00 00:00:00'),
 (3,'op_t_grupos','0000-00-00 00:00:00'),
 (4,'op_t_items','0000-00-00 00:00:00'),
 (5,'op_t_items_combos','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `ge_t_tablas_sincronizar` ENABLE KEYS */;


--
-- Definition of table `ge_t_unidades_medida`
--

DROP TABLE IF EXISTS `ge_t_unidades_medida`;
CREATE TABLE `ge_t_unidades_medida` (
  `Codigo` char(20) NOT NULL DEFAULT '' COMMENT 'Unidad de Medida',
  `Fecha_Update` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'Fecha y Hora de la Ultima Modificacion',
  PRIMARY KEY (`Codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Maestro de Unidades de Medida';

--
-- Dumping data for table `ge_t_unidades_medida`
--

/*!40000 ALTER TABLE `ge_t_unidades_medida` DISABLE KEYS */;
INSERT INTO `ge_t_unidades_medida` (`Codigo`,`Fecha_Update`) VALUES 
 ('ARROBA','0000-00-00 00:00:00'),
 ('BOLSA','0000-00-00 00:00:00'),
 ('CAJA','0000-00-00 00:00:00'),
 ('CIENTO','0000-00-00 00:00:00'),
 ('DOCENA','0000-00-00 00:00:00'),
 ('LIBRA','0000-00-00 00:00:00'),
 ('MEDIA DOCENA','0000-00-00 00:00:00'),
 ('MEDIO CIENTO','0000-00-00 00:00:00'),
 ('METRO','0000-00-00 00:00:00'),
 ('ONZA','0000-00-00 00:00:00'),
 ('QUINTAL','0000-00-00 00:00:00'),
 ('UNIDAD','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `ge_t_unidades_medida` ENABLE KEYS */;


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
  `Fecha_Update` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'Fecha y Hora de la Ultima Modificacion',
  PRIMARY KEY (`PK`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='Conceptos para operaciones del inventario';

--
-- Dumping data for table `op_t_conceptos`
--

/*!40000 ALTER TABLE `op_t_conceptos` DISABLE KEYS */;
INSERT INTO `op_t_conceptos` (`PK`,`Descripcion`,`Tipo`,`Cuenta_Contable`,`Comentarios`,`Estado`,`Fecha_Update`) VALUES 
 (1,'COMPRA','E','13.01.','Compras a Proveedores Locales','A','0000-00-00 00:00:00'),
 (2,'IMPORTACION','E','17.01.','Compras a Proveedores Extranjeros','A','0000-00-00 00:00:00'),
 (3,'CONSIGNACION (ENTRADA)','E','14.01.','Consignaciones de Proveedores','A','0000-00-00 00:00:00'),
 (4,'AJUSTE DE ENTRADA','E','13.00.','Ajuste al Inventario (ENTRADA)','A','0000-00-00 00:00:00'),
 (5,'VENTA','S','30.00.','Ventas','A','0000-00-00 00:00:00'),
 (6,'CONSIGNACION (SALIDA)','S','40.00.','Consignacoines a Clientes (ENVIO)','A','0000-00-00 00:00:00'),
 (7,'MAL ESTADO','S','55.00.','Producto en Mal Estado','A','0000-00-00 00:00:00'),
 (8,'AJUSTE DE SALIDA','S','60.00.','Ajuste al Inventario (SALIDA)','A','0000-00-00 00:00:00');
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
  `Fecha_Update` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'Fecha y Hora de la Ultima Modificacion',
  PRIMARY KEY (`Codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Maestro de Grupo de ITEMS';

--
-- Dumping data for table `op_t_grupos`
--

/*!40000 ALTER TABLE `op_t_grupos` DISABLE KEYS */;
INSERT INTO `op_t_grupos` (`Codigo`,`Descripcion`,`Cuenta_Contable`,`Estado`,`Fecha_Update`) VALUES 
 (70,'Prueba','','A','0000-00-00 00:00:00'),
 (80,'Nuevo Grupo','','A','0000-00-00 00:00:00');
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
  `Precio_Costo` decimal(10,4) NOT NULL DEFAULT '0.0000' COMMENT 'Precio de Costo',
  `Combo` char(1) NOT NULL DEFAULT 'N' COMMENT 'Indica que lleva este Item es un COMBO',
  `Tipo` char(1) NOT NULL DEFAULT 'P' COMMENT 'Tipo (P=Producto / S=Servicio)',
  `Unidad_Medida` char(20) NOT NULL DEFAULT 'UNIDAD' COMMENT 'Unidad de Medida de VENTA',
  `Existencia` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT 'Existencia Actual',
  `Numero_Decimales` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Numero de Decimales para la Existencia (0,2,4)',
  `Precio_Venta_1` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT 'Precio de Venta # 1',
  `Precio_Venta_2` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT 'Precio de Venta # 2',
  `Precio_Venta_3` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT 'Precio de Venta # 3',
  `Precio_Venta_4` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT 'Precio de Venta # 4',
  `Permite_Descuento` char(1) NOT NULL DEFAULT 'N' COMMENT 'Permite efectuar Descuento',
  `Maximo_Descuento` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT 'Valor Maximo a descontar',
  `Control_Posicion` char(1) NOT NULL DEFAULT 'N' COMMENT 'Determina la posicion del ITEM',
  `Estanteria` char(10) NOT NULL DEFAULT '' COMMENT 'Estanteria donde se encuentra el producto',
  `Tramo` char(10) NOT NULL DEFAULT '' COMMENT 'Tramo donde se encuentra el producto',
  `Nivel` char(10) NOT NULL DEFAULT '' COMMENT 'Nivel donde se encuentra el producto',
  `Caja` char(10) NOT NULL DEFAULT '' COMMENT 'Caja donde se encuentra el producto',
  `Referencia` char(20) NOT NULL DEFAULT '' COMMENT 'Referencia Externa',
  `Estado` char(1) NOT NULL DEFAULT 'I' COMMENT 'Estado (A=Activo / I=Inactivo)',
  `Fecha_Update` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'Fecha y Hora de la Ultima Modificacion',
  PRIMARY KEY (`FK_Grupo`,`Codigo`),
  KEY `FK_op_t_items_Unidad_Medida` (`Unidad_Medida`),
  CONSTRAINT `FK_op_t_items_Grupo` FOREIGN KEY (`FK_Grupo`) REFERENCES `op_t_grupos` (`Codigo`),
  CONSTRAINT `FK_op_t_items_Unidad_Medida` FOREIGN KEY (`Unidad_Medida`) REFERENCES `ge_t_unidades_medida` (`Codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Items para la Venta';

--
-- Dumping data for table `op_t_items`
--

/*!40000 ALTER TABLE `op_t_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `op_t_items` ENABLE KEYS */;


--
-- Definition of table `op_t_items_combos`
--

DROP TABLE IF EXISTS `op_t_items_combos`;
CREATE TABLE `op_t_items_combos` (
  `Pk` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Codigo Interno',
  `FK_Grupo` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Codigo de Grupo',
  `FK_Item` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Codigo de Item',
  `Rel_FK_Grupo` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Codigo de Grupo Relacionado',
  `Rel_FK_Item` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Codigo de Item Relacionado',
  `Cantidad` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT 'Cantidad Relacionada',
  `Precio_Venta` decimal(10,0) NOT NULL DEFAULT '0' COMMENT 'Precio de Venta con que se registra en el Inventario',
  `Fecha_Update` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'Fecha y Hora de la Ultima Modificacion',
  PRIMARY KEY (`Pk`),
  KEY `FK_op_t_items_combos_Item` (`FK_Grupo`,`FK_Item`),
  KEY `FK_op_t_items_combos_Item_Rel` (`Rel_FK_Grupo`,`Rel_FK_Item`),
  CONSTRAINT `FK_op_t_items_combos_Item` FOREIGN KEY (`FK_Grupo`, `FK_Item`) REFERENCES `op_t_items` (`FK_Grupo`, `Codigo`),
  CONSTRAINT `FK_op_t_items_combos_Item_Rel` FOREIGN KEY (`Rel_FK_Grupo`, `Rel_FK_Item`) REFERENCES `op_t_items` (`FK_Grupo`, `Codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Descripcion de Items que son Combos';

--
-- Dumping data for table `op_t_items_combos`
--

/*!40000 ALTER TABLE `op_t_items_combos` DISABLE KEYS */;
/*!40000 ALTER TABLE `op_t_items_combos` ENABLE KEYS */;


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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='Log de Transacciones';

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
 (7,'2015-06-09 13:22:46',10,'185.125.145.30','sp_admin_op_t_grupos','INSERT','Nuevo Grupo8080A80|','Nuevo Grupo8080A80|',1,'YA EXISTE'),
 (8,'2015-06-18 21:37:13',1,'125.154.125.1','sp_admin_ge_t_unidades_medida','INSERT','|','|',1,'YA EXISTE'),
 (9,'2015-06-18 21:38:18',1,'125.154.125.1','sp_admin_ge_t_unidades_medida','INSERT','','|',0,'Transaccion Procesada'),
 (10,'2015-06-18 21:39:59',1,'125.154.125.1','sp_admin_ge_t_unidades_medida','INSERT','','|',0,'Transaccion Procesada'),
 (11,'2015-06-18 21:41:41',1,'125.154.125.1','sp_admin_ge_t_unidades_medida','INSERT','|','|',1,'YA EXISTE'),
 (12,'2015-06-18 21:41:46',1,'125.154.125.1','sp_admin_ge_t_unidades_medida','UPDATE','|','|',0,'Transaccion Procesada'),
 (13,'2015-06-18 21:41:56',1,'125.154.125.1','sp_admin_ge_t_unidades_medida','DELETE','|','|',0,'Transaccion Procesada');
/*!40000 ALTER TABLE `op_t_log_transacciones` ENABLE KEYS */;


--
-- Definition of procedure `sp_admin_ge_t_unidades_medida`
--

DROP PROCEDURE IF EXISTS `sp_admin_ge_t_unidades_medida`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_admin_ge_t_unidades_medida`(
p_operacion char(10),		-- DELETE, INSERT, UPDATE
p_codigo char(20),
p_codigo_usuario integer,
p_ip char(40)
)
BEGIN
   --
   -- Este SP procesa en la tabla 'ge_t_unidades_medida' las operaciones de DELETE, INSERT, UPDATE
   -- Devuelve:
   --                tran_error             integer     = Codigo de Error
   --                tran_mensaje           char(60)    = Mensaje de Error
   --
   -- Codigos de ERROR:
   --      0 = TODO CORRECTO
   --      1 = Codigo a trabajar YA existe (aplica para INSERT)
   --      2 = Codigo a trabajar NO existe (aplica para DELETE y UPDATE)
   --      3 = Transaccion NO DEFINIDA
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
            SET lc_Data_Before = IFNULL( (SELECT CONCAT_WS(Codigo,'|') FROM ge_t_unidades_medida WHERE codigo = p_codigo),'NO EXISTE');
            IF lc_Data_Before = 'NO EXISTE' THEN
               SET lc_Error = 2;
               SET lc_Mensaje = 'NO EXISTE';
            ELSE
               DELETE FROM ge_t_unidades_medida WHERE Codigo = p_codigo;
            END IF;
         END;
      WHEN 'INSERT' THEN
         BEGIN
            --
            -- Se Verifica que NO exista el registro a agregar
            --
            SET lc_Data_Before = IFNULL( (SELECT CONCAT_WS(Codigo,'|') FROM ge_t_unidades_medida WHERE codigo = p_codigo),'');
            IF lc_Data_Before <> '' THEN
               SET lc_Error = 1;
               SET lc_Mensaje = 'YA EXISTE';
            ELSE
               INSERT INTO ge_t_unidades_medida (Codigo, Fecha_Update)
                      VALUES (p_codigo, lc_Fecha);
            END IF;
         END;
      WHEN 'UPDATE' THEN
         BEGIN
            --
            -- Se busca el registro a modificar
            --
            SET lc_Data_Before = IFNULL( (SELECT CONCAT_WS(Codigo,'|') FROM ge_t_unidades_medida WHERE codigo = p_codigo),'NO EXISTE');
            IF lc_Data_Before = 'NO EXISTE' THEN
               SET lc_Error = 2;
               SET lc_Mensaje = 'NO EXISTE';
            ELSE
               UPDATE ge_t_unidades_medida SET Fecha_Update = lc_Fecha
                  WHERE Codigo = p_codigo;
            END IF;
         END;
      ELSE
         BEGIN
            SET lc_Error = 3;
            SET lc_Mensaje = 'TRANSACCION NO DEFINIDA';
         END;
   END CASE;
   --
   -- Cuando NO hay error, Se Graba la Informacion en ge_t_tablas_sincronizar
   --
   IF lc_Error = 0 THEN
       UPDATE ge_t_tablas_sincronizar SET Fecha_Update = lc_Fecha WHERE Nombre = 'ge_t_unidades_medida';
   END IF;
   --
   -- Se Graba el Log File
   --
   SET lc_Data_Current = CONCAT_WS (p_codigo, '|');
   --
   INSERT INTO op_t_log_transacciones (Fecha, Codigo_Usuario, Ip, Transaccion, Operacion, Data_Before, Data_Current, Error_Number, Error_Message)
                  VALUES (lc_Fecha, p_codigo_usuario, p_ip, 'sp_admin_ge_t_unidades_medida', p_operacion, lc_Data_Before, lc_Data_Current, lc_error, lc_Mensaje);
   --
   -- Se devuelven los datos
   --
   SELECT lc_Error AS tran_error, lc_Mensaje AS tran_mensaje;
   --
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

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
   --      3 = Transaccion NO DEFINIDA
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
               INSERT INTO op_t_grupos (Codigo, Descripcion, Cuenta_Contable, Estado, Fecha_Update)
                      VALUES (p_codigo, p_descripcion, p_cuenta_contable, p_estado, lc_Fecha);
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
               UPDATE op_t_grupos SET Descripcion = p_descripcion, Cuenta_Contable = p_cuenta_contable, Estado = p_estado, Fecha_Update = lc_Fecha
                  WHERE Codigo = p_codigo;
            END IF;
         END;
      ELSE
         BEGIN
            SET lc_Error = 3;
            SET lc_Mensaje = 'TRANSACCION NO DEFINIDA';
         END;
   END CASE;
   --
   -- Cuando NO hay error, Se Graba la Informacion en ge_t_tablas_sincronizar
   --
   IF lc_Error = 0 THEN
       UPDATE ge_t_tablas_sincronizar SET Fecha_Update = lc_Fecha WHERE Nombre = 'ge_t_unidades_medida';
   END IF;
   --
   -- Se Graba el Log File
   --
   SET lc_Data_Current = CONCAT_WS (p_codigo, p_descripcion, p_cuenta_contable, p_estado, '|');
   --
   INSERT INTO op_t_log_transacciones (Fecha, Codigo_Usuario, Ip, Transaccion, Operacion, Data_Before, Data_Current, Error_Number, Error_Message)
                  VALUES (lc_Fecha, p_codigo_usuario, p_ip, 'sp_admin_op_t_grupos', p_operacion, lc_Data_Before, lc_Data_Current, lc_error, lc_Mensaje);
   --
   -- Se devuelven los datos
   --
   SELECT lc_Error AS tran_error, lc_Mensaje AS tran_mensaje;
   --
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_admin_op_t_items`
--

DROP PROCEDURE IF EXISTS `sp_admin_op_t_items`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_admin_op_t_items`(
p_operacion char(10),		-- DELETE, INSERT, UPDATE
p_fk_grupo integer,
p_codigo integer,
p_descripcion char(60),
p_codigo_barras char(10), 
p_cuenta_contable char(10), 
p_precio_costo decimal(10,4),
p_Combo char(1),
p_Tipo char(1),
p_Unidad_Medida char(20),
p_Existencia decimal(10,2),
p_Precio_Venta_1 decimal(10,2),
p_Precio_Venta_2 decimal(10,2),
p_Precio_Venta_3 decimal(10,2),
p_Precio_Venta_4 decimal(10,2),
p_Permite_Descuento char(1),
p_Maximo_Descuento decimal(10,2),
p_Control_Posicion char(1),
p_Estanteria char(10),
p_Tramo char(10),
p_Nivel char(10),
p_Caja char(10),
p_Referencia char(20),
p_estado char(1),
p_codigo_usuario integer,
p_ip char(40)
)
BEGIN
   --
   -- Este SP procesa en la tabla 'op_t_items' las operaciones de DELETE, INSERT, UPDATE
   -- Devuelve:
   --                tran_error             integer     = Codigo de Error
   --                tran_mensaje           char(60)    = Mensaje de Error
   --
   -- Codigos de ERROR:
   --      0 = TODO CORRECTO
   --      1 = Codigo a trabajar YA existe (aplica para INSERT)
   --      2 = Codigo a trabajar NO existe (aplica para DELETE y UPDATE)
   --      3 = Transaccion NO DEFINIDA
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
            SET lc_Data_Before = IFNULL( (SELECT CONCAT_WS(fk_grupo, codigo, descripcion, codigo_barras, cuenta_contable, precio_costo,
                        Combo, Tipo, Unidad_Medida, Existencia, Precio_Venta_1, Precio_Venta_2, Precio_Venta_3, Precio_Venta_4,
                        Permite_Descuento, Maximo_Descuento, Control_Posicion, Estanteria, Tramo, Nivel, Caja, Referencia, estado,'|') FROM op_t_items WHERE fk_grupo = p_fk_grupo and codigo = p_codigo),'NO EXISTE');
            IF lc_Data_Before = 'NO EXISTE' THEN
               SET lc_Error = 2;
               SET lc_Mensaje = 'NO EXISTE';
            ELSE
               DELETE FROM op_t_items WHERE Codigo = p_codigo;
            END IF;
         END;
      WHEN 'INSERT' THEN
         BEGIN
            --
            -- Se Verifica que NO exista el registro a agregar
            --
            SET lc_Data_Before = IFNULL( (SELECT CONCAT_WS(fk_grupo, codigo, descripcion, codigo_barras, cuenta_contable, precio_costo,
                        Combo, Tipo, Unidad_Medida, Existencia, Precio_Venta_1, Precio_Venta_2, Precio_Venta_3, Precio_Venta_4,
                        Permite_Descuento, Maximo_Descuento, Control_Posicion, Estanteria, Tramo, Nivel, Caja, Referencia, estado,'|') FROM op_t_items WHERE fk_grupo = p_fk_grupo and codigo = p_codigo),'NO EXISTE');
            IF lc_Data_Before <> '' THEN
               SET lc_Error = 1;
               SET lc_Mensaje = 'YA EXISTE';
            ELSE
               INSERT INTO op_t_items (fk_grupo, codigo, descripcion, codigo_barras, cuenta_contable, precio_costo,
                                 Combo, Tipo, Unidad_Medida, Existencia, Precio_Venta_1, Precio_Venta_2, Precio_Venta_3, Precio_Venta_4,
                                 Permite_Descuento, Maximo_Descuento, Control_Posicion, Estanteria, Tramo, Nivel, Caja, Referencia, estado, Fecha_Update)
                      VALUES (p_fk_grupo, p_codigo, p_descripcion, p_codigo_barras, p_cuenta_contable, p_precio_costo,
                            p_Combo, p_Tipo, p_Unidad_Medida, 0, p_Precio_Venta_1, p_Precio_Venta_2, p_Precio_Venta_3, p_Precio_Venta_4,
                            p_Permite_Descuento, p_Maximo_Descuento, p_Control_Posicion, p_Estanteria, p_Tramo, p_Nivel, p_Caja, p_Referencia, p_estado, lc_Fecha);
            END IF;
         END;
      WHEN 'UPDATE' THEN
         BEGIN
            --
            -- Se busca el registro a modificar
            --
            SET lc_Data_Before = IFNULL( (SELECT CONCAT_WS(fk_grupo, codigo, descripcion, codigo_barras, cuenta_contable, precio_costo,
                        Combo, Tipo, Unidad_Medida, Existencia, Precio_Venta_1, Precio_Venta_2, Precio_Venta_3, Precio_Venta_4,
                        Permite_Descuento, Maximo_Descuento, Control_Posicion, Estanteria, Tramo, Nivel, Caja, Referencia, estado,'|') FROM op_t_items WHERE fk_grupo = p_fk_grupo and codigo = p_codigo),'NO EXISTE');
            IF lc_Data_Before = 'NO EXISTE' THEN
               SET lc_Error = 2;
               SET lc_Mensaje = 'NO EXISTE';
            ELSE
               UPDATE op_t_items SET FK_Grupo = p_fk_grupo, Codigo = p_codigo, Descripcion = p_descripcion, Codigo_Barras = p_codigo_barras, 
                        Cuenta_Contable = p_cuenta_contable, Precio_Costo = p_precio_costo, Combo = p_Combo, Tipo = p_Tipo, 
                        Unidad_Medida = p_Unidad_Medida,
                        Precio_Venta_1 = p_Precio_Venta_1, Precio_Venta_2 = p_Precio_Venta_2, Precio_Venta_3 = p_Precio_Venta_3, Precio_Venta_4 = p_Precio_Venta_4,
                        Permite_Descuento = p_Permite_Descuento, Maximo_Descuento = p_Maximo_Descuento, 
                        Control_Posicion = p_Control_Posicion, Estanteria = p_Estanteria, Tramo = p_Tramo, Nivel = p_Nivel, Caja = p_Caja, 
                        Referencia = p_Referencia, Estado = p_estado, Fecha_Update = lc_Fecha
                  WHERE Codigo = p_codigo;
            END IF;
         END;
      ELSE
         BEGIN
            SET lc_Error = 3;
            SET lc_Mensaje = 'TRANSACCION NO DEFINIDA';
         END;
   END CASE;
   --
   -- Cuando NO hay error, Se Graba la Informacion en ge_t_tablas_sincronizar
   --
   IF lc_Error = 0 THEN
       UPDATE ge_t_tablas_sincronizar SET Fecha_Update = lc_Fecha WHERE Nombre = 'ge_t_unidades_medida';
   END IF;
   --
   -- Se Graba el Log File
   --
   SET lc_Data_Current = CONCAT_WS (p_fk_grupo, p_codigo, p_descripcion, p_codigo_barras, p_cuenta_contable, p_precio_costo,
                            p_Combo, p_Tipo, p_Unidad_Medida, p_Existencia, p_Precio_Venta_1, p_Precio_Venta_2, p_Precio_Venta_3, p_Precio_Venta_4,
                            p_Permite_Descuento, p_Maximo_Descuento, p_Control_Posicion, p_Estanteria, p_Tramo, p_Nivel, p_Caja, p_Referencia, p_estado, '|');
   --
   INSERT INTO op_t_log_transacciones (Fecha, Codigo_Usuario, Ip, Transaccion, Operacion, Data_Before, Data_Current, Error_Number, Error_Message)
                  VALUES (lc_Fecha, p_codigo_usuario, p_ip, 'sp_admin_op_t_items', p_operacion, lc_Data_Before, lc_Data_Current, lc_error, lc_Mensaje);
   --
   -- Se devuelven los datos
   --
   SELECT lc_Error AS tran_error, lc_Mensaje AS tran_mensaje;
   --
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_find_data_like`
--

DROP PROCEDURE IF EXISTS `sp_find_data_like`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_find_data_like`(
p_tabla char(60),
p_data_to_find char(40)
)
BEGIN
   --
   -- Este SP, devuelve informacion de la tabla especificada cuando se cumple la condicion LIKE
   -- 
   DECLARE lc_Data_To_Find CHAR(60) DEFAULT '';
   SET lc_Data_To_Find = CONCAT('%', LTRIM(RTRIM(p_data_to_find)), '%');
   --
   -- Se determina la tabla a trabajar
   --
   CASE p_tabla
      WHEN 'ge_t_unidades_medida' THEN
         BEGIN
            SELECT * FROM ge_t_unidades_medida WHERE Codigo LIKE lc_Data_To_Find;
         END;
      WHEN 'op_t_conceptos' THEN
         BEGIN
            SELECT * FROM op_t_conceptos WHERE Descripcion LIKE lc_Data_To_Find;
         END;
      WHEN 'op_t_grupos' THEN
         BEGIN
            SELECT * FROM op_t_grupos WHERE Descripcion LIKE lc_Data_To_Find;
         END;
      WHEN 'op_t_items' THEN
         BEGIN
            SELECT * FROM op_t_items WHERE Descripcion LIKE lc_Data_To_Find;
         END;
      ELSE
         BEGIN
            SET lc_Data_To_Find = '';
         END;
   END CASE;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_get_ge_t_unidades_medida`
--

DROP PROCEDURE IF EXISTS `sp_get_ge_t_unidades_medida`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_ge_t_unidades_medida`(
p_codigo char(20),
p_sort char(20)
)
BEGIN
   --
   -- Este SP, devuelve informacion de las Unidades de Medida definidas
   -- 
   IF p_codigo = '0' THEN
      IF p_sort = 'CODIGO' THEN
         SELECT * FROM ge_t_unidades_medida ORDER BY Codigo;
      ELSE
         SELECT * FROM ge_t_unidades_medida ORDER BY Codigo;
      END IF;
   ELSE
      SELECT * FROM ge_t_unidades_medida WHERE codigo = p_codigo;
   END IF;
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
   IF p_codigo = 0 THEN
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

--
-- Definition of procedure `sp_get_op_t_items`
--

DROP PROCEDURE IF EXISTS `sp_get_op_t_items`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_op_t_items`(
p_fk_grupo int,
p_codigo int,
p_sort char(20)
)
BEGIN
   --
   -- Este SP, devuelve informacion de los Items definidos
   -- 
   IF p_fk_grupo = 0 and p_codigo = 0 THEN
      IF p_sort = 'CODIGO' THEN
         SELECT *, IFNULL((select descripcion from op_t_grupo where op_t_grupo.codigo = op_t_items.fk_grupo),'ERROR: NO Existe el GRUPO') as NOMBRE_GRUPO 
            FROM op_t_items ORDER BY fk_grupo, codigo;
      ELSE
         SELECT *, IFNULL((select descripcion from op_t_grupo where op_t_grupo.codigo = op_t_items.fk_grupo),'ERROR: NO Existe el GRUPO') as NOMBRE_GRUPO
            FROM op_t_items ORDER BY Descripcion;
      END IF;
   ELSE
      SELECT *, IFNULL((select descripcion from op_t_grupo where op_t_grupo.codigo = op_t_items.fk_grupo),'ERROR: NO Existe el GRUPO') as NOMBRE_GRUPO 
         FROM op_t_items WHERE fk_grupo = p_fk_grupo and codigo = p_codigo;
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
