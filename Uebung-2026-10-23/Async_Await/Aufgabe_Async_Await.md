# Aufgabe: Async/Await – Bestell-Pipeline

## 1. Vorhersage bei menge: 0

Erwartete Konsolenausgabe:

🛑 Stufe bestellen: Ungültige Bestellung: 0x "USB-C Hub"

— Pipeline-Lauf beendet (Uhrzeit)

## Erklärung

Die Funktion bestellen() wartet zuerst 300 ms mit await simulate().

Danach wird geprüft, ob menge <= 0 ist.

Bei menge = 0 wird ein ValidationError geworfen.

Der Fehler wird in pipelineAlsGanzes() im catch-Block abgefangen.

Der finally-Block wird immer ausgeführt.
