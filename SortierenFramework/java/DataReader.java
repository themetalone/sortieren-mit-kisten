import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.LinkedList;

public abstract class DataReader{

	final static Charset ENCODING = StandardCharsets.UTF_8;

	public abstract List<ComparableObject> getComparableData();

	public List<String> readLargerTextFileAlternate(String aFileName) throws IOException {
    	Path path = Paths.get(aFileName);
    	List<String> result = (List) new LinkedList(); 
    	try (BufferedReader reader = Files.newBufferedReader(path, ENCODING)){
      		String line = null;
      		boolean firstLine = true;
      		while ((line = reader.readLine()) != null) {
        		if(firstLine){
        			firstLine = false;
        			continue;
        		}else{
        			result.add(line);
        		}
      		}		      
    	}catch(Exception e){
    		throw new IOException();
    	}
    	return result;
  	}


}