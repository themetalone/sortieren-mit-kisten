import java.util.List;
import java.util.LinkedList;
import java.io.IOException;

public class VerbandDataReader extends DataReader {
	
	public final static String location = "./verbaende.csv";

	@Override
	public List<ComparableObject> getComparableData(){
		try{
			List<String> entryLines = super.readLargerTextFileAlternate(location);
			List<ComparableObject> result = new LinkedList();
			for(String entry : entryLines){
				String[] entryFields = entry.split(",");
				result.add(new Verband(entryFields[3],entryFields[0],entryFields[1],entryFields[2]));
			}
			return result;
		}catch(IOException e){
			return new LinkedList();
		}
	}

}