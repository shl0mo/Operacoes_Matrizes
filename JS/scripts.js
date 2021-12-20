function func_mudaSinal() {
	if (document.getElementById('selectOp').value == "Soma") {
		document.getElementById('inputSinal').value = "+";
	} else if (document.getElementById('selectOp').value == "Subtração") {
		document.getElementById('inputSinal').value = "-";
	} else if (document.getElementById('selectOp').value == "Multiplicação") {
		document.getElementById('inputSinal').value = "x";
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
	let array = document.getElementById(idMatriz).value.split('\n');
	let novoArray = [];
	for (i = 0; i < array.length; i++) {
		let linha = [];
		for (j = 0; j < array[i].length; j++) {
			if (parseFloat(array[i][j])/1 == parseFloat(array[i][j])) {
				linha.push(parseFloat(array[i][j]));
			} else if ((array[i][j] == " " && j == 0) || array[i][j] == '') {
				linha.push(array[i][j]);
			}
		}
		novoArray.push(linha);
	}
	if (novoArray == '') {
		alert("Preencha os devidos campos de dados para continuar");
		$('#' + idMatriz).css("box-shadow", "0px 0px 0.3em red");
		return false;
	}
	let indiceVazia = -1;
	let primeiroIndice = 0;
	for (i = 0; i < novoArray.length; i++) {
		if (novoArray[i][0] == ' ') {
			alert("O primeiro elemento de uma linha não pode ser espaço ou enter");
			$('#' + idMatriz).css("box-shadow", "0px 0px 0.3em red");
			return false;
		}
		if (novoArray[i].length == 0) {
			if (primeiroIndice == 0) {
				indiceVazia = i;
				primeiroIndice++;
			}
			for (j = i + 1; j < novoArray.length; j++) {
				if (novoArray[j].length != 0) {
					alert("As linhas devem estar uma imediatamente embaixo da outra");
					$('#' + idMatriz).css("box-shadow", "0px 0px 0.3em red");
					return false;
				}
			}
		}
		if (novoArray[i].length != 0) {
			if (novoArray[i].length != novoArray[0].length) {
				alert("Todas as linhas de uma matriz devem ter o mesmo número de colunas");
				$('#' + idMatriz).css("box-shadow", "0px 0px 0.3em red");
				return false;
			}
		}
	}
	if (indiceVazia != -1) {
		let quantidade = (array.length - 1) - indiceVazia;
		array.splice(indiceVazia, quantidade);
		array.splice((array.length - 1), 1);
	}
	let arrayFinal = [];
	for (i = 0; i < array.length; i++) {
		let linha = [];
		for (j = 0; j < array[i].length; j++) {
			if (parseFloat(array[i][j])/1 == parseFloat(array[i][j]) && array[i][j] != '\n') {
				if (j > 0 && array[i][j - 1] == "-") {
					linha.push(parseFloat(array[i][j]*(-1)));
					j++;
				} else {
					linha.push(parseFloat(array[i][j]));
				}
			}
		}
		arrayFinal.push(linha);
	}
	return arrayFinal;
}


function func_soma(arrayMatriz_1, arrayMatriz_2, idJQ) {
	for (i = 0; i < arrayMatriz_1.length; i++) {
		let strResult = "";
		for (j = 0; j < arrayMatriz_1[i].length; j++) {
			if (arrayMatriz_1[i][j] == "\n" || arrayMatriz_1[i][j] == " ") {
				if (arrayMatriz_1[i][j] == " " && j != (arrayMatriz_1[i].length - 1)) {
					strResult = strResult + arrayMatriz_1[i][j];
				}
			} else {
				let soma = parseFloat(arrayMatriz_1[i][j]) + parseFloat(arrayMatriz_2[i][j]);
				strResult = strResult + soma;
			} 
		}
		$(idJQ).append(strResult + "\n");
	}
}

function func_subtrai(arrayMatriz_1, arrayMatriz_2, idJQ) {
	for (i = 0; i < arrayMatriz_1.length; i++) {
		let strResult = "";
		for (j = 0; j < arrayMatriz_1[i].length; j++) {
			if (arrayMatriz_1[i][j] == "\n" || arrayMatriz_1[i][j] == " ") {
				if (arrayMatriz_1[i][j] == " " && j != (arrayMatriz_1[i].length - 1)) {
					strResult = strResult + arrayMatriz_1[i][j];
				}
			} else {
				let soma = parseFloat(arrayMatriz_1[i][j]) - parseFloat(arrayMatriz_2[i][j]);
				strResult = strResult + soma;
			}
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
				soma += arrayMatriz_1[i][j] * arrayMatriz_2[j][k];
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
		arrayMatriz_1 = document.getElementById('matriz1').value.split("\n");
		arrayMatriz_2 = document.getElementById('matriz2').value.split("\n");
		let arrayFinal1 = func_verificaMatriz('matriz1');
		let arrayFinal2 = func_verificaMatriz('matriz2');
		alert(arrayFinal1);
		alert(arrayFinal2);
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
					func_soma(arrayMatriz_1, arrayMatriz_2, 'textarea');
				} else if (document.getElementById('selectOp').value == "Subtração") {
					func_subtrai(arrayMatriz_1, arrayMatriz_2, 'textarea');
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