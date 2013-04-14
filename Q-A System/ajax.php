<?php
	require_once ( '../common/include_session.php' );	
	require_once ( '../common/include_validate login.php' );
	require_once ( '../common/include_database.php' );

	if (isset($_GET['method'])) {
		$method = stripslashes(htmlspecialchars($_GET['method'], ENT_QUOTES, 'UTF-8'));
		if ($method == 'loadLocations') {
			$sql = "SELECT `locations` FROM `user_state` WHERE `user_ID`=:id;";
			$stmt = $dbh->prepare($sql);
			$stmt->bindParam ( ":id", $_SESSION['id']);
			$stmt->execute();

			$result = $stmt->fetch();
			if ($result != null)
				echo $result['locations'];
			exit();
		} else if ($method == 'getLocation') {
			$sql = "SELECT `cur_loc` FROM `user_state` WHERE `user_ID`=:id;";
			$stmt = $dbh->prepare($sql);
			$stmt->bindParam ( ":id", $_SESSION['id']);
			$stmt->execute();

			$result = $stmt->fetch();
			if ($result != null)
				echo $result['cur_loc'];
			exit();
		} else if ($method == 'setLocation') {
			$params = stripslashes(htmlspecialchars($_POST['args'], ENT_QUOTES, 'UTF-8'));
			$sql = "UPDATE `user_state` SET `cur_loc`=:loc WHERE `user_ID`=:id;";
			$stmt = $dbh->prepare($sql);
			$stmt->bindParam(':loc', $params);
			$stmt->bindParam ( ":id", $_SESSION['id'], PDO::PARAM_STR);
			$stmt->execute();

			echo json_encode(true);
			exit();
		} else if ($method == 'setLocations') {
			$params = $_POST['args'];
			$sql = "UPDATE `user_state` SET `locations`=:loc WHERE `user_ID`=:id;";
			$stmt = $dbh->prepare($sql);
			$stmt->bindParam(':loc', $params);
			$stmt->bindParam ( ":id", $_SESSION['id'], PDO::PARAM_STR);
			$stmt->execute();

			echo json_encode(true);
			exit();
		}
	}
