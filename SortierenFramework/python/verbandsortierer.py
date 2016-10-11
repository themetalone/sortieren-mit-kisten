import csv

"""
	Implementiere dein Sortierverfahren in der Funktion "sortiere"
"""

# Klassen

VERBAND_VERBAND:str = 'verband'
VERBAND_LV:str = 'lv'
VERBAND_UEBERGEORDNET:str = 'uebergeordnet'
VERBAND_NAME:str = 'name'

# Klasse
class Verband:
	def __eq__(self, other):
		return self.verband == other.verband and self.lv == other.lv and self.uebergeordnet == other.uebergeordnet and self.name == other.name

	def vergleich(eigenschaft:str, andererVerband:Verband) -> int:
		""" 
		Vergleicht diesen Verband mit einem anderen Verband in der gewählten Eigenschaft
		Parameters
		----------
			eigenschaft:str
				aus {'verband', 'lv', 'uebergeordnet', 'name'}
			andererVerband:Verband
				ein anderer Verband, der mit diesem verglichen wird
		Returns
		-------
			int
				1 wenn dieser Verband in der Eigenschaft besser ist als andererVerband
				0 wenn dieser Verband in der Eigenschaft gleich ist mit andererVerband
				-1 wenn dieser Verband in der Eigenschaft schlechter ist als andererVerband
		"""
		if getattr(self, eigenschaft) == getattr(other, eigenschaft) : 
			return 0
		else:
			if getattr(self, eigenschaft) > getattr(other, eigenschaft):
				return 1
			else:
				return -1

# Funktionen
def sortiere(liste:List[Verband], eigenschaft:str) -> List[Verband]:
	"""
		TODO: Implementiere dein Sortierverfahren hier. Wenn du zwei Verbandsobjekte vergleichst, benutze die Funktion 'vergleich'.
		z.B. für Verbandsobjekte a und b und der Eigenschaft 'name'
			a.vergleich(b, VERBAND_NAME)
		
		Parameters
		----------
			liste: List[Verband]
				eine Liste mit Verbandsobjekten
			eigenschaft:str
				aus {'verband', 'lv', 'uebergeordnet', 'name'}
		Returns
		-------
			List[Verband]
				Liste mit Verbandsobjekten, sortiert nach der Eigenschaft
		
	"""
def ladeCsv(path:str) -> List[Verband]:
	file = open(path)
	reader = csv.reader(file)
	rowIndex = 0
	result = []
	cols = [VERBAND_VERBAND, VERBAND_LV, VERBAND_UEBERGEORDNET, VERBAND_NAME]
	for row in reader:
		if not rowIndex == 0:
			verband = new Verband()
			colIndex = 0
			for col in row:
				setattr(verband, cols[colIndex], col)
				colIndex = colIndex + 1
			result.append(new Verband())
		rowIndex = rowIndex + 1
	file.close()
	return result

def schreibCsv(liste:List[Verband], path:str) -> None:
	ofile = open(path, "w")
	writer = csv.writer(ofile, delimiter=',', quotechar="", quoting=csv.QUOTE_ALL)
	for verband in liste:
		row = [verband.verband, verband.lv, verband.uebergeordnet, verband.name]
		writer.writerow(row)
	ofile.close()
# Skript

path = './verband.csv'
verbandList = ladeCsv(path)

verbandListNachVerband = sortiere(verbandList, VERBAND_VERBAND)
verbandListNachLV = sortiere(verbandList, VERBAND_LV)
verbandListNachUebergeordnet = sortiere(verbandList, VERBAND_UEBERGEORDNET)
verbandListNachName = sortiere(verbandList, VERBAND_NAME)

schreibCsv(verbandListNachVerband, './verbandNachVerband.csv')
schreibCsv(verbandListNachLV, './verbandNachLv.csv')
schreibCsv(verbandListNachUebergeordnet, './verbandNachUebergeordnet.csv')
schreibCsv(verbandListNachName, './verbandNachName.csv')