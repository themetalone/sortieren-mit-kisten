public abstract class ComparableObject {


	public static long comparisons = 0;

	/**
	 * vergleicht dieses Objekt mit other
	 * @param other das Objekt, mit dem dieses verglichen werden soll
	 * @param property die Eigenschaft, die zum Vergleich herangezogen wird
	 * @return int < 0 wenn die Eigenschaft dieses Objekts kleiner als die von other ist, int > 0 wenn sie größer ist und 0 wenn sie gleich sind
	 */
	public int compareTo(ComparableObject other, int property){
		ComparableObject.comparisons ++;
		return 0;
	}

}