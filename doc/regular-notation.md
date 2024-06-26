Регулярной нотацией назовём такой способ записи правил контекстно свободной грамматики, где в правой части правила находится не конкатенация символов, а регулярное выражение над общим алфавитом языка

Операторы:

$\epsilon$ - пустая строка

$|$ - объединение языков

конкатенация не обозначается

$^*$ - итерация

$()$ - скобки изменяют порядок действий

#### Разложение правил для упращения правых частей ####
Конкатенация
$$
A \rightarrow \beta \gamma
\Leftrightarrow
A \rightarrow B C;\; 
B \rightarrow \beta;\; 
C \rightarrow \gamma
$$
где $B$ и $C$ - новые нетерминалы. Обобщается на любое количество конкатенируемых подвыражений.

Объединение
$$
A \rightarrow \beta |\gamma
\Leftrightarrow
A \rightarrow \beta;\; 
A \rightarrow \gamma
$$
Обобщается на любое количество объединяемых подвыражений.

Итерация
$$
A \rightarrow \beta ^*
\Leftrightarrow
A \rightarrow B;\; 
B \rightarrow \epsilon;\; 
B \rightarrow \beta B
$$
где $B$ - новый нетерминал.

Скобки в тривиальном случае исчезают
$$
A \rightarrow (B)
\Leftrightarrow
A \rightarrow B
$$

#### Именованные группы ####
Именованные группы используются для захвата подстроки в качестве именованного атрибута.

Синтаксис захвата именованной группы:
$$(<name>\beta)$$

Преобразование правила в тривиальном случае:

$$A \rightarrow (<x>B) 
\Leftrightarrow
A \rightarrow B,\, A.x = B.raw$$
где $A$ и $B$ - нетерминалы языка, $x$ - произвольное имя синтезируемого атрибута, $raw$ - атрибут, равный соответствующей нетерминалу подстроке.

Нетерминалы, в которые $A$ входит как подстрока, синтезируют $x$ (если нет конфликта или явного указания иного поведения):

$$B  \rightarrow \beta A \gamma,\, B.x = A.x$$

#### Правила синтеза raw ####

$$A \rightarrow a,\, A.raw = "a";$$
$$A \rightarrow B,\, A.raw = B.raw;$$
$$A \rightarrow B C,\, A.raw = B.raw + C.raw.$$

#### Атрибуты ####
Первичные атрибуты - синтезированы.
Нетерминал может интерпретироваться как словарь атрибутов и присвоен атрибуту.
Каждому правилу может быть сопоставлено несколько формул создания новых атрибутов, как синтезируемых, так и наследуемых.
Тип атрибута может быть строкой, точечной парой или словарём.
Над атрибутами определена только одна операция - создание точечной пары.