<?php
	require_once("./includes/common.php");
	require_once(INCLUDE_PATH."/Config.class.php");
	require_once(MODELS_PATH."/CaseStudy.php");
	require_once(MODELS_PATH."XmlData.php");
	include(DOC_ROOT_PATH."general.php");
	
	$and = new XmlData($caseStudyId,$anxml);


	switch($_REQUEST['a']){
		default:

		break;

		case 'a'://add
			$apd->add($_POST['data']);
		break;

		case 'd':
			if(isset($_REQUEST['id'])){
				$ceData = $apd->deleteById($_REQUEST['id']);
				redirectBrowser(HTTP_ROOT."manage.php");
			}
		break;

		case 'e': //edit
			if(isset($_REQUEST['id'])){
				$editFlag=true;
				$ceData = $apd->getById($_REQUEST['id']);
				$cfData = $and->getByField($_REQUEST['id'],'pid');
			}
		break;

		case 'u'://update submitted
			if(isset($_REQUEST['id'])){
			$apd->update($_POST['data']);
			}
		break;
	}

	$data = $apd->getAllbyField('Future','Status');

	include(TEMPLATE_PATH."investmentcost.tpl.php"); ?>
