import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import iconLinkedin60 from "../assets/icons/linkedin-square-logo-60.png"
import iconEmail60 from "../assets/icons/envelope-regular-60.png"
import iconPhone60 from "../assets/icons/phone-solid-60.png"


function PdfRaw({ data }) {


  const styles = StyleSheet.create({
    page: { paddingTop: 35, paddingBottom: 47, paddingHorizontal: 35 },
    icon: { width: 12, height: 12 },
    section: { marginVertical: 5 },
    sectionInfo: { marginVertical: 5, textAlign: 'center' },
    mainTitle: { fontSize: 20, textAlign: 'center', fontFamily: 'shippori', fontWeight: 'ultrabold' },
    basicText: { fontSize: 10, textAlign: 'center', fontFamily: 'shippori', fontWeight: 'normal' },
    sectionTitleBox: { fontSize: 14, fontFamily: 'shippori', fontWeight: 'extrabold', backgroundColor: '#e3e3e3', paddingHorizontal: 5, marginBottom: 5 },
    sectionTitleLine: { fontSize: 14, fontFamily: 'shippori', fontWeight: 'extrabold', borderBottomWidth: 1, borderBottomColor: '#7b7b7b', marginBottom: 5 },
    item: { marginBottom: 5 },
    itemTitle: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
    itemTitleText: { fontSize: 11, fontFamily: 'shippori', fontWeight: 'bold' },
    itemTitleTextWork: { fontSize: 11, fontFamily: 'shippori', fontWeight: 'bold', width: '80%', lineHeight: '1.2', marginBottom: 5 },
    itemTitleTextDate: { fontSize: 10, fontFamily: 'shippori', fontWeight: 'normal' },
    itemSubtitle: { fontSize: 10, fontFamily: 'shippori', fontWeight: 'semibold', marginBottom: 3 },
    itemSubtitleEducation: { fontSize: 10, fontFamily: 'shippori', fontWeight: 'normal', marginBottom: 3 },
    itemText: { fontSize: 10, fontFamily: 'shippori', fontWeight: 'normal' },
    footerDisclaimer: { fontSize: 7, fontFamily: 'shippori', fontWeight: 'normal', position: 'absolute', bottom: 20, left: 35, color: '#404040' },
    pageNumber: { fontSize: 7, fontFamily: 'shippori', fontWeight: 'normal', position: 'absolute', bottom: 30, left: 35, width: '100%', textAlign: 'center', color: '#404040' },
  });




  const iconLinkedin = <Image src={iconLinkedin60} style={styles.icon} debug />
  const iconEmail = <Image src={iconEmail60} style={styles.icon} debug />
  const iconPhone = <Image src={iconPhone60} style={styles.icon} debug />

  const linkedinString = (data.basicInformation.hasLinkedin) ? ("(LinkedIn) " + data.basicInformation.linkedin) : ""
  const websiteString = (data.basicInformation.hasWebsite) ? ("www." + data.basicInformation.website) : ""
  const divider = (data.basicInformation.hasWebsite == "" || data.basicInformation.hasLinkedin == "") ? "" : "|"
  var secondLineBasicInfo = <Text style={styles.basicText}>{`${linkedinString}  ${divider}  ${websiteString}`}</Text>



  const shipporiRegular = "/src/assets/fonts/Shippori/ShipporiMincho-Regular.ttf"
  const shipporiBold = "/src/assets/fonts/Shippori/ShipporiMincho-Bold.ttf"
  const shipporiExtraBold = "/src/assets/fonts/Shippori/ShipporiMincho-ExtraBold.ttf"
  const shipporiSemiBold = "/src/assets/fonts/Shippori/ShipporiMincho-SemiBold.ttf"

  Font.register({
    family: 'shippori', fonts: [
      { src: shipporiRegular, fontWeight: 'normal' },
      { src: shipporiBold, fontWeight: 'bold' },
      { src: shipporiSemiBold, fontWeight: 'semibold' },
      { src: shipporiExtraBold, fontWeight: 'ultrabold' },
    ]
  });





  return (
    <div>

      <Document>
        <Page size="A4" style={styles.page}>

          <View style={styles.sectionInfo}>
            <Text style={styles.mainTitle}>{data.basicInformation.firstname + " " + data.basicInformation.lastname}</Text>
            <Text style={styles.basicText}>
              {`${data.basicInformation.city}, ${data.basicInformation.country}  |  `}
              {"  "}
              {data.basicInformation.email}{"  |  "}
              {"  "}
              {`${data.basicInformation.phonenumber}`}
            </Text>
            {secondLineBasicInfo}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitleLine}>Education</Text>
            {
              data.education.map((item) => (
                <View style={styles.item} key={item.id}>
                  <View style={styles.itemTitle}>
                    <Text style={styles.itemTitleText}>{item.organization}</Text>
                    <Text style={styles.itemTitleTextDate}>{`${item.startmonth} ${item.startyear} − ${item.endmonth} ${item.endyear}`}</Text>
                  </View>
                  <Text style={styles.itemSubtitleEducation}>{item.qualification}{" − "}{"Grade:"}</Text>
                  {(item.description != "") && <Text style={styles.itemText}>{item.description}</Text>}
                </View>
              ))
            }
          </View>


          {/* SECTION 3 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitleLine}>Work Experience</Text>
            {
              data.workExperience.map((item) => (
                <View style={styles.item} key={item.id}>
                  <View style={styles.itemTitle}>
                    <Text style={styles.itemTitleTextWork}>{`${item.position}  −  ${item.organization}`}</Text>
                    <Text style={styles.itemTitleTextDate}>{`${item.startmonth} ${item.startyear} − ${item.endmonth} ${item.endyear}`}</Text>
                  </View>
                  {(item.description != "") && <Text style={styles.itemText}>{item.description}</Text>}
                </View>
              ))
            }
          </View>

          {/* SECTION 4 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitleLine}>Skills & Languages</Text>
            {
              data.skills.map((item) => (
                <Text style={styles.itemText} key={item.id}>•  {item.description}</Text>
              ))
            }
            <Text style={styles.itemTitleTextWork}>Languages</Text>
            {
              data.languages.map((item) => (
                <Text style={styles.itemText} key={item.id}>•  {item.language}: {item.level} {item.certification && "[certified]"}</Text>
              ))
            }
          </View>

          {/* SECTION 5 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitleLine}>Personal Projects & Interests</Text>
            {
              data.personalProjectsAndInterests.map((item) => (
                <Text style={styles.itemText} key={item.id}>•  {item.description}</Text>
              ))
            }
          </View>

          {
            data.footerInfo.pageCounterVisible && <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
          }
          <Text fixed style={styles.footerDisclaimer}>{data.footerInfo.disclaimerVisible && data.footerInfo.disclaimer}</Text>
        </Page>
      </Document>
    </div>

  )


}

export default PdfRaw