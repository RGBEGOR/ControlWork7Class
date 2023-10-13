const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");
const label =document.querySelector('label')
const inp = document.querySelector('#check'),
   audio = document.querySelector('audio')


label.addEventListener('click', function (){
	if(inp.checked){
		audio.pause()
	}else{
		audio.play()
	}
})



class Quiz
{
	constructor(type, questions, results)
	{

		this.type = type;


		this.questions = questions;

		this.results = results;

		this.score = 0;

		this.result = 0;

		this.current = 0;
	}

	Click(index)
	{
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;


		if(value >= 1)
		{
			correct = index;
		}
		else
		{

			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}


	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}


	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 


class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}


class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}


class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}


	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}


const results = 
[
	new Result("Вам многому нужно научиться", 0),
	new Result("Вы уже неплохо разбираетесь", 3),
	new Result("Ваш уровень выше среднего", 4),
	new Result("Поздравляем Вы успешно прошли контрольный опрос", 5)
];


const questions = 
[
	new Question("Правдо ли утверждение что Средние века наступили в конце V века, когда распалась Римская империя в 476 году . ", 
	[
		new Answer('нет точного ответа', 0),
		new Answer("не правда в 5 веке", 0),
		new Answer("Неверно", 0),
		new Answer("Верно так считаеться", 1)
	]),
	new Question(" государство, основанное в 552 г. Бумином в Центральной Азии племенным союзом , главными занятиями которых были кочевое скотоводство и охота. ", 
	[
		new Answer('Тюрский каганат', 1),
		new Answer("Испанское королевство", 0),
		new Answer("Монголия", 0),
		new Answer("Эфталиты и Сасаниды", 0)
	]),
	new Question("871–899 гг. – правление .... Великого, который впервые, соединив все королевства в одно, назвал себя королем Англии, а также дал серьезный отпор скандинавам.", 
	[
		new Answer('Экберта', 0),
		new Answer("Артура ", 0),
		new Answer("Генриха ", 0),
		new Answer("Альфреда", 1)
	]),
	new Question("  буквально «заречье» (араб.), историческая область в Центральной Азии, получившая свое название в период арабского завоевания (VII – VIII вв.), ранее известна как Трансосксиана. ", 
	[
		new Answer('Хорасан', 0),
		new Answer("Мавераннахр", 1),
		new Answer("Трансианка Окская", 0),
		new Answer("Туран", 0)
	]),
	new Question("Они находились в личной зависимости от своего сюзерена. ... ", 
	[
		new Answer('Вассалы', 1),
		new Answer("Нелегалы", 0),
		new Answer("Галлы", 0),
		new Answer("Короли", 0)

	]),
];


const quiz = new Quiz(1, questions, results);

Update();


function Update()
{

	if(quiz.current < quiz.questions.length) 
	{

		headElem.innerHTML = quiz.questions[quiz.current].text;


		buttonsElem.innerHTML = "";


		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		

		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{

		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Ваши очки: " + quiz.score;
	}
}

function Init()
{

	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{

		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{

	let correct = quiz.Click(index);


	let btns = document.getElementsByClassName("button");


	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{

		btns[index].className = "button button_correct";
	}


	setTimeout(Update, 1000);
}



