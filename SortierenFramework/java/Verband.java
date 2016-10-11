public class Verband extends ComparableObject {

	public String name;
	public String verband;
	public String lv;
	public String uebergeordnet;

	public Verband(String name, String verband, String lv, String uebergeordnet){
		this.name = name;
		this.verband = verband;
		this.lv = lv;
		this.uebergeordnet = uebergeordnet;
	}

	public static final int NAME = 0;
	public static final int VERBAND = 1;
	public static final int LV = 2;
	public static final int UEBERGEORDNET = 3;
	
	@Override
	public int compareTo(ComparableObject other, int property){
		super.compareTo(other, property);

		Verband o = (Verband) other;

		int result = 0;
		switch(property){
			case NAME:
				result = this.name.compareTo(o.name);
				break;
			default:
			case VERBAND:
				result = this.verband.compareTo(o.verband);
				break;
			case LV:
				result = this.lv.compareTo(o.lv);
				break;
			case UEBERGEORDNET:
				result = this.uebergeordnet.compareTo(o.uebergeordnet);
				break;
		}
		return result;
	}
}