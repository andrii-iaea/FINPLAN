<?php 
	require_once("./includes/common.php");
	require_once(MODELS_PATH."XmlData.php");
	require_once(INCLUDE_PATH."/Config.class.php");
	require_once(MODELS_PATH."/CaseStudy.php");
	include(DOC_ROOT_PATH."general.php");
	
	
	
	$byd = new XmlData($caseStudyId,$byxml);
	
	$caData = $byd->getAll();
	
	switch($_REQUEST['a']){
		default:
			
		break;	
			
				
		case 'e': //edit
				$ceData = $byd->getById($_REQUEST['id']);
				$cpData = $apd->getById($_REQUEST['pid']);
		break;
			
	}	 
	
	
	include(TEMPLATE_PATH."rep_genexpense.tpl.php");		
?>
