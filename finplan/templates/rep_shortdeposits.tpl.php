<?php $repmenu="block"; if(!isset($_REQUEST['viewid'])){?><?php include TEMPLATE_PATH."header.tpl.php"?>
</head>
<body><a href="?viewid=1" target=�_blank�>Open in New Window</a><?php }?>
<h3>Short-Term Deposits in Local Currency (Million)</h3>



<?php $repmenu="block"; if(!isset($_REQUEST['viewid'])){?><div><?php }?>
<table border="1" cellspacing="2" cellpadding="0">
  <tr valign="top">
    <td valign="top">
	<table border="0" cellpadding="0" cellspacing="0">
		
	<tr>
		<th >Year</th>
	</tr>
    <?php for($i=$ahData['startYear'];$i <= $ahData['endYear']; $i++){?>
        <tr>
          <td><?php echo "$i";?></td>
        </tr>
    <?php }?>
    </table>
	</td>
			<td valign="top">
			<table border="0" cellpadding="0" cellspacing="0">
				
				
				<tr>
				  <th>Flow to</th>
				  <th>Balance</th>
				  <th>Interest</th>
				
				  
				</tr>
				
		<?php 
			for($m=$ahData['startYear'];$m <= $ahData['endYear']; $m++){
						
				$dval = 'SDL_'.$m;
				$bval = 'SDBL_'.$m;
				$ival = 'SDIL_'.$m;
				
				
	
		?>
			   <tr>
				 <td class="number"><?php echo round($cnData[$dval],$RoundPlace);?></td>
				 <td class="number"><?php echo round($cnData[$bval],$RoundPlace);?></td>
				 <td class="number"><?php echo round($cnData[$ival],$RoundPlace);?></td>
				
				
				</tr>
		<?php	}?>
			  </table></td>
  </tr>
</table>

</div>
<!-- end #page -->
<?php include TEMPLATE_PATH."footer.tpl.php"?>
