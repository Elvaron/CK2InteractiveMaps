window.onload = function() {
	var characterForm = $("#characterForm");
	characterForm.hide();

	var titleForm = $("#titleForm");
	titleForm.hide();

	var dataForm = $("#dataForm");

	$("#tabControls").change(function () {
		selected_value = $("input[name='radios']:checked").val();
		if (selected_value == "character")
		{
			titleForm.hide();
			dataForm.hide();
			characterForm.show();
		}
		else if (selected_value == "title")
		{
			characterForm.hide();
			dataForm.hide();
			titleForm.show();
		}
		else if (selected_value == "data")
		{
			characterForm.hide();
			titleForm.hide();
			dataForm.show();
		}
	});

	initDataForm();
}