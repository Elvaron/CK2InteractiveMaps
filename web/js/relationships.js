function loadRelationship(character)
{
	// Clear relationships
	$flowchart.flowchart('setData', $blankFlowChartData);

	var linkCount = 1;
	createOperatorFor(character, 500, 50);

	// Spouse
	if (character.spouse > 0 && characterMap.has(character.spouse))
	{
		var spouse = characterMap.get(character.spouse);
		createOperatorFor(spouse, 150, 10);
		createLink(character, spouse, "output_spouse", "inputs", linkCount++);
	}

	// Heir
	if (character.heir > 0 && characterMap.has(character.heir))
	{
		var heir = characterMap.get(character.heir);
		createOperatorFor(heir, 150, 40);
		createLink(character, heir, "output_heir", "inputs", linkCount++);
	}

	// Regent
	if (character.regent > 0 && characterMap.has(character.regent))
	{
		var regent = characterMap.get(character.regent);
		createOperatorFor(regent, 50, 100);
		createLink(character, regent, "output_regent", "inputs", linkCount++);
	}

	// Liege
	if (character.liege > 0 && characterMap.has(character.liege))
	{
		var liege = characterMap.get(character.liege);
		createOperatorFor(liege, 50, 150);
		createLink(liege, character, "outs_vassals", "input_liege", linkCount++);
	}

	// Vassals
	if (character.vassals.length > 0)
	{
		var offset = 200;

		for (var i = 0; i < character.vassals.length; i++)
		{
			var vassalId = character.vassals[i];
			if (characterMap.has(vassalId))
			{
				var vassal = characterMap.get(vassalId);
				createOperatorFor(vassal, 400, offset);

				createLink(character, vassal, "outs_vassals", "input_liege", linkCount++);
				offset = offset + 30;
			}
		}
	}

	// Parents
	if (character.parents.length > 0)
	{
		var offset = 10;

		for (var i = 0; i < character.parents.length; i++)
		{
			var parentId = character.parents[i];
			if (characterMap.has(parentId))
			{
				var parent = characterMap.get(parentId);
				if (parent.gender == gender.MALE || parent.gender == gender.FEMALE)
				{
					createOperatorFor(parent, 200, offset);

					var gendered = (parent.gender == gender.MALE) ? "father" : "mother";
					createLink(parent, character, "outs_children", "input_" + gendered, linkCount++);
					offset = offset + 30;	
				}
			}
		}
	}

	// Children
	if (character.children.length > 0)
	{
		var offset = 10;

		for (var i = 0; i < character.children.length; i++)
		{
			var childId = character.children[i];
			if (characterMap.has(childId))
			{
				var child = characterMap.get(childId);
				if (character.gender == gender.MALE || character.gender == gender.FEMALE)
				{
					createOperatorFor(child, 100, offset);

					var gendered = (character.gender == gender.MALE) ? "father" : "mother";
					createLink(character, child, "outs_children", "input_" + gendered, linkCount++);
					offset = offset + 30;	
				}
			}
		}
	}
}

function saveRelationship(character)
{
	if (character == null)
	{
		return;
	}

	character.regent = 0;
	character.heir = 0;

	// Untie vassal-liege
	for (var i = 0; i < character.vassals.length; i++)
	{
		if (characterMap.has(character.vassals[i]))
		{
			var vassal = characterMap.get(character.vassals[i]);
			if (vassal.liege == character.id)
			{
				vassal.liege = 0;
			}
		}
	}
	character.vassals = [];

	// Untie child-parents
	for (var i = 0; i < character.parents.length; i++)
	{
		if (characterMap.has(character.parents[i]))
		{
			var parent = characterMap.get(character.parents[i]);
			parent.children = parent.children.filter(function (e) { return e !== character.id});
		}
	}
	character.parents = [];

	// Untie parent-children
	for (var i = 0; i < character.children.length; i++)
	{
		if (characterMap.has(character.children[i]))
		{
			var child = characterMap.get(character.children[i]);
			child.parents = child.parents.filter(function (e) { return e !== character.id});
		}
	}
	character.children = [];

	// Untie liege-vassal
	if (character.liege != 0)
	{
		if (characterMap.has(character.liege))
		{
			var liege = characterMap.get(character.liege);
			liege.vassals = liege.vassals.filter(function (e) { return e !== character.id});
		}
		character.liege = 0;
	}

	// Untie spouses
	if (character.spouse != 0)
	{
		if (characterMap.has(character.spouse))
		{
			var spouse = characterMap.get(character.spouse);
			spouse.spouse = 0;
		}
		character.spouse = 0;
	}

	var searchId = "created_operator_" + character.id;

	var data = $flowchart.flowchart('getData');

	if (data.operators.hasOwnProperty(searchId))
	{
		var centralOperator = data.operators[searchId];

		for (var linkId in data.links)
		{
			if (data.links.hasOwnProperty(linkId))
			{
				var link = data.links[linkId];

				if (link.fromOperator != searchId && link.toOperator != searchId)
				{
					// Irrelevant
					continue;
				}

				if (link.fromOperator == searchId && link.toOperator == searchId)
				{
					// Circular
					continue;
				}

				var otherCharacterIdStr = "";
				var characterConnector = "";
				var otherCharacterConnector = "";

				if (link.fromOperator != searchId)
				{
					otherCharacterIdStr = link.fromOperator;
					otherCharacterConnector = link.fromConnector;
					characterConnector = link.toConnector;
				} else {
					otherCharacterIdStr = link.toOperator;
					otherCharacterConnector = link.toConnector;
					characterConnector = link.fromConnector;
				}

				var otherCharacterIdStr = link.fromOperator != searchId ? link.fromOperator : link.toOperator;
				var otherCharacterId = parseInt(otherCharacterIdStr.substring(17));

				if (characterMap.has(otherCharacterId))
				{
					var otherCharacter = characterMap.get(otherCharacterId);
					storeRelationship(character, otherCharacter, characterConnector, otherCharacterConnector);
				}
			}
		}
	}
}

function storeRelationship(character, otherCharacter, characterConnector, otherCharacterConnector)
{
	// Parent
	if (characterConnector == "input_father" || characterConnector == "input_mother")
	{
		// Child-Parent-Relationship
		if (!character.parents.includes(otherCharacter.id))
		{
			character.parents.push(otherCharacter.id);
		}

		// Parent-Child-Relationship
		if (!otherCharacter.children.includes(character.id))
		{
			otherCharacter.children.push(character.id);
		}
	}

	// Liege
	if (characterConnector == "input_liege")
	{
		// Vassal-Liege-Relationship
		character.liege = otherCharacter.id;

		// Liege-Vassal-Relationship
		if (!otherCharacter.vassals.includes(character.id))
		{
			otherCharacter.vassals.push(character.id);
		}
	}

	// Spouse
	if (characterConnector == "output_spouse" || otherCharacterConnector == "output_spouse")
	{
		// Spouses
		character.spouse = otherCharacter.id;
		otherCharacter.spouse = character.id;
	}

	// Regent
	if (characterConnector == "output_regent")
	{
		// One-Sided Relationship
		character.regent = otherCharacter.id;
	}

	// Heir
	if (characterConnector == "output_heir")
	{
		// One-Sided Relationship
		character.heir = otherCharacter.id;
	}

	// Children
	if (characterConnector == "outs_children")
	{
		if (!character.children.includes(otherCharacter.id))
		{
			character.children.push(otherCharacter.id);
		}

		if (!otherCharacter.parents.includes(character.id))
		{
			otherCharacter.parents.push(character.id);
		}
	}

	// Vassals
	if (characterConnector == "outs_vassals")
	{
		if (!character.vassals.includes(otherCharacter.id))
		{
			character.vassals.push(otherCharacter.id);
		}

		otherCharacter.liege = character.id;
	}
}

function createLink(characterOutput, characterInput, outputConnector, inputConnector, linkIterator)
{
	var linkId = 'link_' + linkIterator;
	var link = {
		fromOperator: 'created_operator_' + characterOutput.id,
		fromConnector: outputConnector,
		toOperator: 'created_operator_' + characterInput.id,
		toConnector: inputConnector,
	};

	var nextFromSubConnector = $flowchart.flowchart('getNextSubConnector', link.fromOperator, link.fromConnector);

	if (nextFromSubConnector > 1)
	{
		link.fromSubConnector = nextFromSubConnector - 1;
	}

	var nextToSubConnector = $flowchart.flowchart('getNextSubConnector', link.toOperator, link.toConnector);

	if (nextToSubConnector > 1)
	{
		link.toSubConnector = nextToSubConnector - 1;
	}

	$flowchart.flowchart('createLink', linkId, link);
}

function createOperatorFor(character, leftPosition, topPosition)
{	
	var operatorId = 'created_operator_' + character.id;

	if ($flowchart.flowchart('doesOperatorExists', operatorId))
	{
		return;
	}

	var operatorData = {
		top: topPosition,
		left: leftPosition,
		properties: {
			title: character.name,
			inputs: {
	    		input_father: {
	      			label: 'Father',
	    		},
	    		input_mother: {
	      			label: 'Mother',
	    		},
	    		input_liege: {
	      			label: 'Liege',
	    		},
	    		inputs: {
	    			label: 'Input (:i)',
	    			multiple: true
	    		}
	  		},
	  		outputs: {
	    		output_spouse: {
	      			label: 'Spouse',
	    		},
	    		output_heir: {
		      		label: 'Heir',
	    		},
	    		output_regent: {
	      			label: 'Regent',
	    		},
	    		outs_children: {
		        	label: 'Child (:i)',
	        		multiple: true
	      		},
	      		outs_vassals: {
		        	label: 'Vassal (:i)',
	        		multiple: true
	      		}
			}
		}
	};

	$flowchart.flowchart('createOperator', operatorId, operatorData);
}