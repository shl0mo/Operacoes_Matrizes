function func_mudaSinal() {
	if (document.getElementById('selectOp').value == "Soma") {
		document.getElementById('inputSinal').value = "+";
	} else if (document.getElementById('selectOp').value == "Subtração") {
		document.getElementById('inputSinal').value = "-";
	} else if (document.getElementById('selectOp').value == "Multiplicação") {
		document.getElementById('inputSinal').value = "x";
	}
}

const round = (num, places) => {
	if (!("" + num).includes("e")) {
		return +(Math.round(num + "e+" + places)  + "e-" + places);
	} else {
		let arr = ("" + num).split("e");
		let sig = ""
		if (+arr[1] + places > 0) {
			sig = "+";
		}

		return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places);
	}
}

function func_volta() {
	$('#section_resultado').animate({left: "100px"}, 100, () => {$('#section_resultado').remove()});
	$('#section_dados').animate({left: "0px"}, 100, () => {$('#section_dados').show()});
	document.getElementById('matriz1').value = '';
	document.getElementById('matriz2').value = '';
	let dadosAnt_matriz_1 = ""
	for (i = 0; i < arrayMatriz_1.length; i++) {
		dadosAnt_matriz_1 += arrayMatriz_1[i];
		dadosAnt_matriz_1 += "\n"
	}
	let dadosAnt_matriz_2 = ""
	for (i = 0; i < arrayMatriz_2.length; i++) {
		dadosAnt_matriz_2 += arrayMatriz_2[i];
		dadosAnt_matriz_2 += "\n"
	}
	document.getElementById('matriz1').value = dadosAnt_matriz_1;
	document.getElementById('matriz2').value = dadosAnt_matriz_2;
}


function func_verificaMatriz(idMatriz) {
	$('#' + idMatriz).css("box-shadow", "none");
	//Passo 1:
	let array1 = (document.getElementById(idMatriz).value).split('\n');
	let array2 = [];
	let array = [];
	let arrayFinal = [];
	//Passo 2:
	for (i = 0; i < array1.length; i++) {
		let strNum = (array1[i]).split(" ");
		array2.push(strNum);
	}
	for (i = 0; i < array2.length; i++) {
		for (j = 0; j < array2[i].length; j++) {
			let pont = 0;
			for (k = 0; k < array2[i][j].length; k++) {
				if (parseFloat(array2[i][j][k])/1 != parseFloat(array2[i][j][k])/1 && array2[i][j][k] != '.') {
					if (array2[i][j][k] == ',') {
						$('#' + idMatriz).css("box-shadow", "0px 0px 0.3em red");
						alert("As casas decimais devem ser separadas por ponto e não por vírgula");
						return false;
					} else {
						$('#' + idMatriz).css("box-shadow", "0px 0px 0.3em red");
						alert("Caractere inválido no campo de dados");
						return false;
					}
				}
				if (array2[i][j][k] == '.') {
					pont++;
				}
			}
			if (pont > 1) {
				$('#' + idMatriz).css("box-shadow", "0px 0px 0.3em red");
				alert("Caractere inválido entre números - dois pontos de casas decimais em um número");
				return false;
			}
		}
	}
	//alert(array2);
	//Passo 3:
	for (i = 0; i < array2.length; i++) {
		let linha = [];
		for (j = 0; j < array2[i].length; j++) {
			if (parseFloat(array2[i][j])/1 == parseFloat(array2[i][j])) {
				let strNumero = array2[i][j].toString();
				if (strNumero.indexOf('.') != -1) {
					strNumero = strNumero.split('.');
					let inteiro = parseFloat(strNumero[0]);
					let real = "0." + strNumero[1];
					real = parseFloat(real);
					let numero = inteiro + real;
					numero = parseFloat(numero);
					array.push(numero);
				} else {
					array.push(parseFloat(array2[i][j]));	
				}
			}
		}
		array.push(linha);
	}
	if (array2 == '') {
		alert("Preencha os devidos campos de dados para continuar");
		$('#' + idMatriz).css("box-shadow", "0px 0px 0.3em red");
		return false;
	}
	let primeiroIndice = 0;
	for (i = 0; i < array2.length; i++) {
		if (array2[i][0] == '' && array2[i] != '') {
			alert("O primeiro elemento de uma linha não pode ser um espaço");
			$('#' + idMatriz).css("box-shadow", "0px 0px 0.3em red");
			return false;
		} else if (array2[i] == '') {
			for (j = i; j < array2.length; j++) {
				if (array2[j] != '') {
					alert("As linhas devem estar uma imediatamente embaixo da outra");
					$('#' + idMatriz).css("box-shadow", "0px 0px 0.3em red");
					return false;
				}
			}
		}
	}
	for (i = 0; i < array2.length; i++) {
		let linha = [];
		if (array2[i] != '') {
			for (j = 0; j < array2[i].length; j++) {
				if (parseFloat(array2[i][j])/1 == parseFloat(array2[i][j])) {
					linha.push(array2[i][j]);
				}
			}
			arrayFinal.push(linha);
		}
	}
	for (i = 0; i < arrayFinal.length; i++) {
		if (arrayFinal[i].length != arrayFinal[0].length) {
			alert("Todas as linhas de uma matriz devem ter o mesmo número de colunas");
			$('#' + idMatriz).css("box-shadow", "0px 0px 0.3em red");
			return false;
		}
	}
	return arrayFinal;
}

function func_soma(arrayMatriz_1, arrayMatriz_2, idJQ) {
	for (i = 0; i < arrayMatriz_1.length; i++) {
		let strResult = "";
		for (j = 0; j < arrayMatriz_1[i].length; j++) {
			soma = parseFloat(arrayMatriz_1[i][j]) + parseFloat(arrayMatriz_2[i][j]);
			soma = soma.toString();
			if (soma.indexOf('.') != -1) {
				soma = parseFloat(soma);
				soma = round(soma, 3);
			}
			strResult += soma + " ";
		}
		$(idJQ).append(strResult + "\n");
	}
}

function func_subtrai(arrayMatriz_1, arrayMatriz_2, idJQ) {
	for (i = 0; i < arrayMatriz_1.length; i++) {
		let strResult = "";
		for (j = 0; j < arrayMatriz_1[i].length; j++) {
			soma = parseFloat(arrayMatriz_1[i][j]) - parseFloat(arrayMatriz_2[i][j]);
			soma = soma.toString();
			if (soma.indexOf('.') != -1) {
				soma = parseFloat(soma);
				soma = round(soma, 3);
			}
			strResult += soma + " ";
		}
		$(idJQ).append(strResult + "\n");
	}
}


function func_multiplica(arrayMatriz_1, arrayMatriz_2, idJQ) {
	for (i = 0; i < arrayMatriz_1.length; i++) {
		let strResult = "";
		for (k = 0; k < arrayMatriz_2[0].length; k++) {
			let soma = 0;
			for (j = 0; j < arrayMatriz_1[0].length; j++) {
				soma = parseFloat(soma) + parseFloat(arrayMatriz_1[i][j]) * parseFloat(arrayMatriz_2[j][k]);
				soma = soma.toString();
				if (soma.indexOf('.') != -1) {
					soma = parseFloat(soma);
					soma = round(soma, 3);
				}
			}
			strResult = strResult + soma + " ";
		}
		strResult = strResult + "\n";
		$(idJQ).append(strResult);
	}
}

function func_calcula() {
	if (document.getElementById('selectOp').value == "-- Operação --") {
		alert("Escolha a operação a ser realizada");
	} else {
		arrayMatriz_1 = (document.getElementById('matriz1').value).split("\n");
		arrayMatriz_2 = (document.getElementById('matriz2').value).split("\n");
		let arrayFinal1 = func_verificaMatriz('matriz1');
		if (arrayFinal1 == false) {
			return false;
		}
		let arrayFinal2 = func_verificaMatriz('matriz2');
		if (arrayFinal2 == false) {
			return false;
		}
		if (arrayFinal1 != false && arrayFinal2 != false) {
			if ((arrayFinal1.length != arrayFinal2.length) && document.getElementById('selectOp').value != "Multiplicação") {
				alert("As matrizes devem ter o mesmo número de linhas");
				$('#matriz1').css("box-shadow", "0px 0px 0.3em red");
				$('#matriz2').css("box-shadow", "0px 0px 0.3em red");
				return false;
			} else if ((arrayFinal1[0].length != arrayFinal2[0].length) && document.getElementById('selectOp').value != "Multiplicação") {
				alert("As matrizes devem ter o mesmo número de colunas");
				$('#matriz1').css("box-shadow", "0px 0px 0.3em red");
				$('#matriz2').css("box-shadow", "0px 0px 0.3em red");
				return false;
			} else if ((arrayFinal1[0].length != arrayFinal2.length) && document.getElementById('selectOp').value == "Multiplicação") {
				alert("O número de colunas na primeira matriz deve ser igual ao número de linhas da segunda matriz");
				$('#matriz1').css("box-shadow", "0px 0px 0.3em red");
				$('#matriz2').css("box-shadow", "0px 0px 0.3em red");
				return false;
			} else {
				$('body').append('<section id="section_resultado" style="display: none"><button style="background-image: url(IMG/volt.png);position: absolute" id="voltar" readonly onclick="func_volta()">Voltar</button><br/><h1>Resultado:</h1><br/><textarea rows="10" cols="20" id="textarea_resultado" class="textareaMatriz" readonly></textarea></section>');
				if (document.getElementById('selectOp').value == "Soma") {
					func_soma(arrayFinal1, arrayFinal2, 'textarea');
				} else if (document.getElementById('selectOp').value == "Subtração") {
					func_subtrai(arrayFinal1, arrayFinal2, 'textarea');
				} else {
					func_multiplica(arrayFinal1, arrayFinal2, 'textarea');
				}
				$('#section_dados').animate({left: "-600px"}, 100, () => {$('#section_dados').hide()});
				$('#section_resultado').css("display", "block");
			}
			$('#matriz1').css("box-shadow", "none");
			$('#matriz2').css("box-shadow", "none");
		}
	}
}