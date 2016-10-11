import java.util.List;

public class Sortieren {

	/**
	 * Sortiert eine Liste
	 * @param liste eine Liste vergleichbarerer Objekte, die das ComparableObject Interface erfüllen
	 * @return List<ComparableObject> eine aufsteigend sortierte Liste
	 */
	public static List<ComparableObject> sortieren(List<ComparableObject> liste){
		// TODO 
		return null;
	}

	/**
	 * Prueft die Sortierung einer Liste
	 * @param liste eine Liste vergleichbarerer Objekte, die das ComparableObject Interface erfüllen
	 * @return true wenn die Liste sortiert ist. false sonst
	 */
	public static boolean sortiert(List<ComparableObject> liste){
		//TODO
		return false;
	}

	public static DataReader reader = new VerbandDataReader();

	public static void main(String[] args){
		System.out.println("------Sortieren------");
		List<ComparableObject> objects = reader.getComparableData();
		System.out.println("Daten geladen");

		List<ComparableObject> sortierteListe = sortieren(objects);
		if(sortiert(sortierteListe)){
			System.out.println("Glückwunsch!");
			System.out.println("Du hast "+ComparableObject.comparisons+" Vergleiche benötigt");
		}else{
			System.out.println("irgendetwas ist noch falsch");
		}
	}

}