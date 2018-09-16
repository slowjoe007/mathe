# mathe

Ein einfacher Mathematik-Arbeitsblatt-Generator. Läuft auf [Node.js](https://nodejs.org/de/).

## Installation
1. [_Node.js_](https://nodejs.org/de/download/) V8.4 oder neuer installieren
2. Das Projekt klonen mittels _Git_ oder als [Zip-Datei herunterladen](https://github.com/slowjoe007/mathe/archive/master.zip) und in ein Verzeichnis entpacken.
3. Auf der Kommandozeile/Shell in das Projektverzeichnis wechseln
4. Abhängigkeiten installieren: `npm install`

## Benutzung
1. Nach der Installation das Projekt starten: `npm start`
2. Im Browser http://localhost:3000/mathe aufrufen
3. Kriterien festlegen
   1. **Rechenarten**: Ausgewählte Rechenarten werden berücksichtigt. Jedes Türmchen besteht aus Aufgaben einer Rechenart. Aus den gewählten Rechenarten wird zufällig eine für das nächste Türmchen ausgesucht.
   2. **Zu berechnende Position**: Die Gleichungen folgen dem Muster _1. Operand_ _Operator_ _2. Operand_ = _Resultat_. Der _Operator_ wird durch die ausgewählte Rechenart festgelegt. Welche Position (_1. Operand_, _2. Operand_ und/oder _Resultat_) in der Gleichung berechnet werden muss, kann hier festgelegt werden. Je Aufgabe muss nur eine Position berechnet werden. Werden hier mehrere Positionen ausgewählt, wird die konkrete gesuchte Position einer Aufgabe zufällig bestimmt. Innerhalb eines Türmchens können dadurch verschiedene Positionen zu berechnen sein, z.B. in der ersten Aufgabe wird das _Resultat_ gesucht, während in der zweiten Aufgabe der _1. Operand_ bestimmt werden muss und in der dritten Aufgabe wieder das _Resultat_, etc.
   3. **Summanden von ... bis ...**: Für Additionsaufgaben (_Summand_ + _Summand_ = _Summe_) können hier die Grenzen für die Bestimmung der Summanden festgelegt werden. Der Arbeitsblattgenerator sucht aus dem Wertebereich zufällige Werte als Summanden heraus. Die Grenzen sind inklusiv. Die genannten Werte können als mögliche Summanden auftreten. <br> **Bitte beachten:** Für Subtraktionsaufgaben (_Minuend_ - _Subtrahend_ = _Differenz_) entsprechen diese Grenzen den Wertebereichen für _Subtrahend_ und _Differenz_.
   4. **Faktoren von ... bis ...**: Für Multiklikationsaufgaben (_Faktor_ * _Faktor_ = _Produkt_) können hier die Grenzen für die Bestimmung der Faktoren festgelegt werden. Der Arbeitsblattgenerator sucht aus dem Wertebereich zufällige Werte als Faktoren heraus. Die Grenzen sind inklusiv. Die genannten Werte können als mögliche Faktoren auftreten. <br> **Bitte beachten:** Für Divisionsaufgaben (_Dividend_ - _Divisor_ = _Quotient_) entsprechen diese Grenzen den Wertebereichen für _Divisor_ und _Quotient_.
   5. **Aufgaben je Türmchen**: Anzahl der zu bestimmenden Gleichungen in einem Aufgabenblock mit einer konkreten Rechenart.
   6. **Reichen**: Anzahl der Zeilen aus Aufgabentürmchen auf einem Rechenblatt.
   7. **Spalten**: Anzahl der nebeneinander stehenden Aufgabentürmchen in einer Reihe.
4. Ein Klick auf die Schaltfläche **Generieren** wechselt die Ansicht und zeigt das anhand der getätigten Angaben generierte Mathematik-Aufgabenblatt.
5. Mit der Druckfunktion des Browsers - typischerweise aufrufbar über die Tastenkombination <kbd>Ctrl</kbd> + <kbd>P</kbd> - kann das Arbeitsblatt ausgedruckt werden.
6. Das Neuladen des Arbeitsblatts im Browser - z.B. über die Taste <kbd>F5</kbd> - generiert ein neues Arbeitsblatt mit den zuvor vorgenommenen Einstellungen.
